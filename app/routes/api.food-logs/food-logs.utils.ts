import { unstable_createFileUploadHandler, unstable_parseMultipartFormData, NodeOnDiskFile } from "@remix-run/node";
import { getOpenAIClient } from "~/utils/openAI";

export const getAudioFileFromRequest = async (request: Request) => {
    // Remix's file upload handler is used to parse the multipart form data
    const uploadHandler = unstable_createFileUploadHandler({
        maxPartSize: 5_000_000,
        directory: "food-logs",
        file: ({ filename }) => filename,
    })
    const formData = await unstable_parseMultipartFormData(
        request,
        uploadHandler,
    );
    // NodeOnDiskFile extends the File interface
    return formData.get('audio') as NodeOnDiskFile;
}

// OpenAI's API is used to transcribe the audio file
export const getTranscriptionFromAudioFile = async (audioFile: NodeOnDiskFile) => {
    const openai = getOpenAIClient();
    return openai.audio.transcriptions.create({
        file: audioFile,
        model: "whisper-1",
    });
}