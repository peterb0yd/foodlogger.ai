import { getOpenAIClient } from '~/utils/openAI';
import { IFoodLogItemTranscriptionOutput } from './food-log-item.interfaces';
import { PreparationMethods, Units } from '@prisma/client';
import { AUDIO_FILE_EXT, MIME_TYPE } from '~/utils/constants';
import fs from 'fs';
import { deepgram } from '~/utils/deepgram';

// DeepGram's API is used to transcribe the audio file
export const getTranscriptionFromAudioFile = async (audioData: string) => {
	const audioReadStream = await convertAudioDataToReadStream(audioData);
	const { result } = await deepgram.listen.prerecorded.transcribeFile(audioReadStream, {
		model: 'nova-2',
		smart_format: true,
	});
	return result?.results.channels[0].alternatives[0].transcript as string;
};

// Find out what the user said and have ChatGPT put it in JSON format
export const parseFoodItemLogData = async (transcription: string) => {
	try {
		const openai = getOpenAIClient();
		const preparationMethods = Object.keys(PreparationMethods).join(',');
		const unitValues = Object.keys(Units).join(',');
		const response = await openai.chat.completions.create({
			model: 'gpt-3.5-turbo',
			messages: [
				{
					role: 'system',
					content: `
                    Your only job is to decipher the sentence from the user and create one or more food logs from it. You need to extract the food item name, preparation method, quantity and unit from the sentence. The food item name must be singular. If they say "eggs", then write "egg". The preparation method must be one of these case sensitive values: ${preparationMethods}. If you don't understand the preparation method or can't find a match to one of those values, omit the field. The unit must be one of these case sensitive values: ${unitValues}. If they say "spoon" match it to "TABLESPOON". If you don't understand the unit or can't find a match, set unit to "NONE". Quantity is a float alue. You can use 0.5 if they say "half" or 2.5 if they say "two and a half". Respond in JSON format as shown in the examples. If you hear more than one food log, respond with an array of food logs.
                    Here are a few examples:
                    |
                    User: "I had 2 eggs for breakfast"
                    System: {name:"egg",quantity:2,unit:"NONE"}
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
                    System: {name:"potato",quantity:2,unit:"CUP",preparation:"AIR_FRIED"}
                    | 
                    User: "I had half a spoon of ice cream"
                    System: {name:"ice cream",quantity:0.5,unit:"TABLESPOON"}
                    |
                    User: "I had two and a half cups of rice, a cup of beans and a cup of chicken"
                    System: [
                        {name:"rice",quantity:2.5,unit:"CUP"},
                        {name:"beans",quantity:1,unit:"CUP"},
                        {name:"chicken",quantity:1,unit:"CUP"}
                    ]
                `,
				},
				{
					role: 'user',
					content: transcription,
				},
			],
		});
        // TODO: as a user, I should be able to see if my audio was bad and how to fix it
		return JSON.parse(response.choices[0].message.content as string) as
			| IFoodLogItemTranscriptionOutput
			| Array<IFoodLogItemTranscriptionOutput>;
	} catch (error) {
		throw new Error(`Error getting food item log data from transcription: ${error}`);
        // TODO: handle bad prompt error
	}
};

// audioString is the base64 encoded audio file
export const convertAudioDataToReadStream = async (audioString: string) => {
	const fileName = `/tmp/audio.${AUDIO_FILE_EXT}`;
	await fs.writeFileSync(
		fileName,
		Buffer.from(audioString.replace(`data:${MIME_TYPE};base64,`, ''), 'base64')
	);
	return fs.createReadStream(fileName);
};
