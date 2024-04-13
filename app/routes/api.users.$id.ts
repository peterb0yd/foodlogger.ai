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

export const action: ActionFunction = async ({ request, params }) => {
	await SessionService.requireAuth(request);

	switch (request.method) {
        case RequestMethods.PATCH: {
			try {
                const userId = params.id as string;
                const data = await request.formData();
                const userData = JSON.parse(data.get('json') as string);
                const user = await UserService.update(userId, userData);
				if (!user) {
					throw new Error(`Failed to update user settings for ${userId}`);
				}
                // Can only update a user on settings page
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
