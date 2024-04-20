import { ActionFunction, LoaderFunction, json, redirect } from '@remix-run/node';
import { DailyLogService } from '~/api/modules/daily-log/daily-log.service';
import { SessionService } from '~/api/modules/session/session.service';
import { RequestMethods } from '~/enums/requests';
import { PageRoutes } from '~/enums/routes';
import { jsDateToWebString } from '~/utils/datetime';

export const loader: LoaderFunction = async () => {
    return redirect('/404');
};

export const action: ActionFunction = async ({ request, params }) => {
	await SessionService.requireAuth(request);

	switch (request.method) {
		case RequestMethods.PATCH: {
			try {
                const userId = params.id as string;
                const data = await request.formData();
                const userData = JSON.parse(data.get('json') as string);
                const dailyLog = await DailyLogService.update(userId, userData);
				if (!dailyLog) {
					throw new Error(`Failed to update dailyLog for ${userId}`);
				}
                return json(dailyLog);
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
