import { ActionFunction, LoaderFunction, json } from '@remix-run/node';
import { FoodLogItemService } from '~/api/modules/food-log-item/food-log-item.service';
import { convertAudioDataToReadStream, getTranscriptionFromAudioFile } from '~/api/modules/food-log-item/food-log-item.utils.server';
import { RequestMethods } from '~/enums/requests';
import { deepgram } from '~/utils/deepgram';
import { SessionService } from '~/api/modules/session/session.service';

export const loader: LoaderFunction = async () => {
	return new Response(null, {
		status: 405,
		statusText: 'Method Not Allowed',
	});
};

export const action: ActionFunction = async (context) => {
    await SessionService.requireAuth(context.request);
    
	const { request, params } = context;
	switch (request.method) {
		case RequestMethods.POST: {
			try {
				// Find out what the user said and create one or more food logs from it
				const formData = await request.formData();
                const foodLogId = formData.get('foodLogId') as string;
				const audioData = formData.get('audio') as string;
                const transcription = await getTranscriptionFromAudioFile(audioData);
				const foodItemLog = await FoodLogItemService.create(transcription, foodLogId);
                console.log({foodItemLog});
				return json(foodItemLog);
			} catch (error) {
				console.error(error);
				return new Response(null, {
					status: 500,
					statusText: 'Internal Server Error',
				});
			}
		}
        case RequestMethods.DELETE: {
            try {
                const formData = await request.formData();
                const foodLogItemId = formData.get('id') as string;
                await FoodLogItemService.delete(foodLogItemId);
                return new Response(null, {
                    status: 204,
                    statusText: 'No Content',
                });
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