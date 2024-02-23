import { Prisma } from '@prisma/client';
import { getOpenAIClient } from '~/utils/openAI';
import { unstable_createFileUploadHandler, unstable_parseMultipartFormData, NodeOnDiskFile } from "@remix-run/node";
import { FoodItemLogTranscriptionData } from './food-item-logs.types';

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

// Find out what the user said and have ChatGPT put it in JSON format
export const getFoodItemLogData = async (transcription: string) => {
	try {
		const openai = getOpenAIClient();
		const response = await openai.chat.completions.create({
			model: 'gpt-3.5-turbo',
			messages: [
				{
					role: 'system',
					content: `
                    Your only job is to decipher the sentence from the user and create a food item log from it. You need to extract the food item name, preparation method, quantity and unit from the sentence. If you can't get the preparation method, omit the field. If you can't get the quantity and unit, set them to 1 and "NONE" respectively. Response in JSON format. Here are a few examples:

                    User: "I had 2 eggs for breakfast"
                    System: { name: "eggs", quantity: 2, unit: "NONE" }

                    User: "I had 1 cup of coffee"
                    System: { name: "coffee", quantity: 1, unit: "cup" }
                    
                    User: "I had a banana"
                    System: { name: "banana", quantity: 1, unit: "NONE" }
                    
                    User: "One cup of steamed brocolli"
                    System: { name: "brocolli", preparation: "steamed", quantity: 1, unit: "cup" }
                `,
				},
				{
					role: 'user',
					content: transcription,
				},
			],
		});
		return JSON.parse(
			JSON.stringify(response.choices[0].message.content)
		) as FoodItemLogTranscriptionData;
	} catch (error) {
		throw new Error(`Error getting food item log data from transcription: ${error}`);
	}
};
