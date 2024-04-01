import { ActionFunction, LoaderFunction, json, redirect } from '@remix-run/node';
import { SessionService } from '~/api/modules/session/session.service';
import { TemplateService } from '~/api/modules/template/template.service';
import { UserService } from '~/api/modules/user/user.service';
import { RequestMethods } from '~/enums/requests';
import fromPairs from 'lodash-es/fromPairs';
import { PageRoutes } from '~/enums/routes';

export const loader: LoaderFunction = async () => {
    return redirect('/404');
};

export const action: ActionFunction = async ({ request }) => {
	await SessionService.requireAuth(request);

	switch (request.method) {
		case RequestMethods.PATCH: {
			try {
				const data = await request.formData();
                const userId = data.get('userId') as string;
                const settingsData = await request.json();
                const user = await UserService.updateSettings(userId, settingsData);
				if (!user) {
					throw new Error(`Failed to update user settings for ${userId}`);
				}
				return redirect(PageRoutes.SETTINGS)
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
