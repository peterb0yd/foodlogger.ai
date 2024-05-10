import { ActionFunction, LoaderFunction, json } from '@remix-run/node';
import { FoodLogItemService } from '~/api/modules/food-log-item/food-log-item.service';
import { RequestMethods } from '~/enums/requests';
import { SessionService } from '~/api/modules/session/session.service';
import { BadAudioInputError } from '~/api/modules/food-log-item/food-log-item.errors';

export const loader: LoaderFunction = async () => {
	return new Response(null, {
		status: 405,
		statusText: 'Method Not Allowed',
	});
};

export const action: ActionFunction = async (context) => {
	await SessionService.requireAuth(context.request);

	const { request } = context;
	switch (request.method) {
		case RequestMethods.POST: {
			try {
				// Find out what the user said and create one or more food logs from it
				const formData = await request.formData();
				const foodLogId = formData.get('foodLogId') as string;
				const audioData = formData.get('audio') as string;
				const templateId = formData.get('templateId') as string;
				if (templateId) {
					const foodItemLogs = await FoodLogItemService.createFromTemplate(foodLogId, templateId);
					return json(foodItemLogs ?? {});
				} else {
					const result = await FoodLogItemService.create(audioData, foodLogId);
					return json(result ?? {});
				}
			} catch (error) {
				if (error instanceof BadAudioInputError) {
					return json({
						suggestion: error.message,
					});
				}
				console.log('API FOOD LOG ITEMS ERROR', error);
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
