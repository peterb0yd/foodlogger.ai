import { ActionFunction, LoaderFunction, NodeOnDiskFile, unstable_composeUploadHandlers, unstable_createFileUploadHandler, unstable_createMemoryUploadHandler, unstable_parseMultipartFormData } from "@remix-run/node";
import { getOpenAIClient } from "~/utils/openAI";
import fs from "fs";

export const loader: LoaderFunction = async () => {
    return new Response(null, {
        status: 405,
        statusText: "Method Not Allowed",
    });
}

export const action: ActionFunction = async ({ request }) => {
    switch (request.method) {
        case "POST": {
            // Get the audio file from the request
            const uploadHandler = unstable_composeUploadHandlers(
                unstable_createFileUploadHandler({
                    maxPartSize: 5_000_000,
                    directory: "food-logs",
                    file: ({ filename }) => filename,
                }),
                unstable_createMemoryUploadHandler(),
            );
            const formData = await unstable_parseMultipartFormData(
                request,
                uploadHandler,
            );
            const audioFile = formData.get('audio') as NodeOnDiskFile;
            const audioFilePath = audioFile.getFilePath();

            try {
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