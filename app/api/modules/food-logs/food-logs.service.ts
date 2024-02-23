import { getAudioFileFromRequest, getTranscriptionFromAudioFile } from "./food-logs.utils";

// Find out what the user said and create a food log from it
export const createFoodLogFromAudioRequest = async (request: Request) => {
    const audioFile = await getAudioFileFromRequest(request);
    const transcription = await getTranscriptionFromAudioFile(audioFile);
    return transcription;
}