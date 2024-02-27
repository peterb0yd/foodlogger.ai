import { ActionFunction, LoaderFunction, json } from '@remix-run/node';
import { FoodLogItemService } from '~/api/modules/food-log-item/food-log-item.service';
import { convertAudioDataToReadStream } from '~/api/modules/food-log-item/food-log-item.utils.server';
import { bytescaleUploader, bytescaleProcesser, BytescaleUrlBuilder } from '~/api/utils/bytescale';
import { AUDIO_FILE_EXT, MIME_TYPE } from '~/api/utils/constants';
import { RequestMethods } from '~/enums/requests';
import fs from 'fs';
import { Readable } from 'stream';
import { assembyai } from '~/api/utils/assemblyai';
import { RealtimeTranscript } from 'assemblyai';
import { deepgram } from '~/api/utils/deepgram';

export const loader: LoaderFunction = async () => {
	return new Response(null, {
		status: 405,
		statusText: 'Method Not Allowed',
	});
};

export const action: ActionFunction = async (context) => {
	const { request, params } = context;
	switch (request.method) {
		case RequestMethods.POST: {
			try {
				// Find out what the user said and create one or more food logs from it
				// const formData = await parseMultipartFormData(request);
				const formData = await request.formData();
				const audioString = formData.get('audio') as string;

				const audioReadStream = await convertAudioDataToReadStream(audioString);

				// STEP 2: Call the transcribeFile method with the audio payload and options
				const { result } = await deepgram.listen.prerecorded.transcribeFile(
					audioReadStream,
					{
						model: 'nova-2',
						smart_format: true,
					}
				);

                const transcriptText = result?.results.channels[0].alternatives[0].transcript as string;
				const foodLogId = params.id as string;
				const foodItemLog = await FoodLogItemService.create(transcriptText, foodLogId);
				return json(foodItemLog);
			} catch (error) {
				console.error(error);
				return new Response(null, {
					status: 500,
					statusText: 'Internal Server Error',
				});
			}
		}
		default: {
			return new Response('Method not allowed', { status: 405 });
		}
	}
};