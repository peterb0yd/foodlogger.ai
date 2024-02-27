import { ActionFunction, LoaderFunction, json } from '@remix-run/node';
import { FoodLogItemService } from '~/api/modules/food-log-item/food-log-item.service';
import { convertAudioDataToReadStream } from '~/api/modules/food-log-item/food-log-item.utils.server';
import { bytescaleUploader, bytescaleProcesser, BytescaleUrlBuilder } from '~/api/utils/bytescale';
import { AUDIO_FILE_EXT, MIME_TYPE } from '~/api/utils/constants';
import { RequestMethods } from '~/enums/requests';
import fs from 'fs';
import { Readable } from 'stream';

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
				const fileSize = fs.statSync(`/tmp/audio.${AUDIO_FILE_EXT}`).size;

				const FILE_NAME = `/tmp/audio.${AUDIO_FILE_EXT}`;

				const audioFile = await bytescaleUploader.upload({
					data: audioReadStream,
					size: fileSize,
					originalFileName: FILE_NAME, // 'audio.wav
					mime: MIME_TYPE,
				});

				const audioTransformUrl = BytescaleUrlBuilder.url({
					accountId: process.env.BYTE_SCALE_ACCOUNT_ID as string,
					filePath: audioFile.filePath,
					options: {
						transformation: 'audio',
						transformationParams: {
							f: 'wav',
						},
					},
				});

				const audioWriteStream = fs.createWriteStream(FILE_NAME);
				const response = await fetch(audioTransformUrl);
				await responseToReadable(response)?.pipe(audioWriteStream);
				const readStream = await fs.createReadStream(FILE_NAME);

				const foodLogId = params.id as string;
				const foodItemLog = await FoodLogItemService.create(readStream, foodLogId);
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

// TODO: move to util
const responseToReadable = (response: Response) => {
	if (!response.body) {
		return null;
	}
	const reader = response.body.getReader();
	const rs = new Readable();
	rs._read = async () => {
		const result = await reader.read();
		if (!result.done) {
			rs.push(Buffer.from(result.value));
		} else {
			rs.push(null);
			return;
		}
	};
	return rs;
};
