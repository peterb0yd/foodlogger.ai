import { ActionFunction, LoaderFunction, json } from '@remix-run/node';
import { FoodLogItemService } from '~/api/modules/food-log-item/food-log-item.service';
import { convertAudioDataToReadStream, getTranscriptionFromAudioFile } from '~/api/modules/food-log-item/food-log-item.utils';
import { RequestMethods } from '~/enums/requests';
import { deepgram } from '~/utils/deepgram';
import { SessionService } from '~/api/modules/session/session.service';
import { BadAudioInputError } from '~/api/modules/food-log-item/food-log-item.errors';
import { BadRequestError } from '~/api/errors/errors.server';

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
        case RequestMethods.DELETE: {
            try {
                const { id } = params;
                if (!id) throw new BadRequestError('No id provided');
                await FoodLogItemService.delete(id as string);
                return json({ id });
            } catch (error) {
                if (error instanceof BadRequestError) {
                    return new Response(error.message, {
                        status: 400,
                        statusText: 'Bad Request',
                    });
                }
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