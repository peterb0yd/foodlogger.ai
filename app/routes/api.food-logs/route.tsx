import { getOpenAIClient } from "~/utils/openAI";
import { getAudioFileFromRequest } from "./food-logs.utils";
import { ActionFunction, LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async () => {
    return new Response(null, {
        status: 405,
        statusText: "Method Not Allowed",
    });
}

export const action: ActionFunction = async ({ request }) => {
    switch (request.method) {
        case "POST": {
            try {
                const audioFile = await getAudioFileFromRequest(request);
                // send the file to OpenAI for transcription
                const openai = getOpenAIClient();
                const transcription = await openai.audio.transcriptions.create({
                    file: audioFile,
                    model: "whisper-1",
                });
                return new Response(transcription.text, {
                    status: 200,
                    statusText: "OK",
                });
            } catch (error) {
                console.error(error);
                return new Response(null, {
                    status: 500,
                    statusText: "Internal Server Error",
                });
            }
        }
        default: {
            return new Response("Method not allowed", { status: 405 });
        }
    }
}