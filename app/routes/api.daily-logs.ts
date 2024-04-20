import { ActionFunction, LoaderFunction, json, redirect } from '@remix-run/node';
import { DailyLogService } from '~/api/modules/daily-log/daily-log.service';
import { SessionService } from '~/api/modules/session/session.service';
import { RequestMethods } from '~/enums/requests';
import { PageRoutes } from '~/enums/routes';
import { jsDateToWebString } from '~/utils/datetime';

export const loader: LoaderFunction = async () => {
    return redirect('/404');
};

export const action: ActionFunction = async ({ request }) => {
	await SessionService.requireAuth(request);

	switch (request.method) {
		case RequestMethods.POST: {
			try {
                const data = await request.formData();
                const userId = data.get('userId') as string;
                const isoDate = data.get('isoDate') as string;
                const dailyLog = await DailyLogService.create({ userId, isoDate });
                const webDate = jsDateToWebString(dailyLog.entryDate);
				return redirect(`${PageRoutes.DAILY_LOGS}/${webDate}`);
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
