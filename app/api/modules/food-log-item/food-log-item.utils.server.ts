import { getOpenAIClient } from '~/api/utils/openAI';
import {
	NodeOnDiskFile,
	unstable_createFileUploadHandler,
	unstable_parseMultipartFormData,
} from '@remix-run/node';
import { IFoodLogItemTranscriptionOutput } from './food-log-item.interfaces';
import { PreparationMethods, Units } from '@prisma/client';
import { MIME_TYPE } from '~/api/utils/constants';
import fs from 'fs';
import { FsReadStream } from 'openai/_shims/node-types.mjs';

export const parseMultipartFormData = async (request: Request) => {
	// Remix's file upload handler is used to parse the multipart form data 
	const uploadHandler = unstable_createFileUploadHandler({
		maxPartSize: 5000000,
		file: ({ filename }) => filename,
	});
	return unstable_parseMultipartFormData(request, uploadHandler);
};

// OpenAI's API is used to transcribe the audio file
export const getTranscriptionFromAudioFile = async (audioStream: FsReadStream) => {
	const openai = getOpenAIClient();
	const response = await openai.audio.transcriptions.create({
		file: audioStream,
		model: 'whisper-1',
	});
	return response.text;
};

// Find out what the user said and have ChatGPT put it in JSON format
export const parseFoodItemLogData = async (transcription: string) => {
	try {
		const openai = getOpenAIClient();
		const preparationMethods = Object.keys(PreparationMethods);
		const unitValues = Object.keys(Units);
		const response = await openai.chat.completions.create({
			model: 'gpt-3.5-turbo',
			messages: [
				{
					role: 'system',
					content: `
                    Your only job is to decipher the sentence from the user and create a food item log from it. You need to extract the food item name, preparation method, quantity and unit from the sentence. The preparation method must be one of these case sensitive values: ${preparationMethods.join(
											', '
										)}. If you don't understand the preparation method or can't find a match to one of those values, omit the field. The unit must be one of these case sensitive values: ${unitValues.join(
						','
					)}. If they say "spoon" match it to "TABLESPOON". If you don't understand the unit or can't find a match, set unit to "NONE". Quantity is a float alue. You can use 0.5 if they say "half" or 2.5 if they say "two and a half". Respond in JSON format as shown in the examples.
                    Here are a few examples:
                    |
                    User: "I had 2 eggs for breakfast"
                    System: {name:"eggs",quantity:2,unit:"NONE"}
                    |
                    User: "I drank 1 cup of coffee"
                    System: {name:"coffee",quantity:1,unit:"CUP"}
                    |
                    User: "I ate a banana"  
                    System: {name:"banana",quantity:1,unit:"NONE"}
                    |
                    User: "One cup of steamed brocolli"
                    System: {name:"brocolli",quantity:1,unit:"CUP",preparation:"STEAMED"}
                    |
                    User: "Two cups air fried potatoes"
                    System: {name:"potatoes",quantity:2,unit:"CUP",preparation:"AIR_FRIED"}
                    | 
                    User: "I had half a spoon of ice cream"
                    System: {name:"ice cream",quantity:0.5,unit:"TABLESPOON"}
                `,
				},
				{
					role: 'user',
					content: transcription,
				},
			],
		});
		return JSON.parse(
			response.choices[0].message.content as string
		) as IFoodLogItemTranscriptionOutput;
	} catch (error) {
		throw new Error(`Error getting food item log data from transcription: ${error}`);
	}
};

// audioString is the base64 encoded audio file
export const getReadStreamFromAudioString = async (audioString: string) => {
    const fileName = '/tmp/audio.webm';
    await fs.writeFileSync(
        fileName,
        Buffer.from(audioString.replace(`data:${MIME_TYPE};base64,`, ''), 'base64')
    );
    return fs.createReadStream(fileName);
}
