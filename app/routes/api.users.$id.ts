import { ActionFunction, LoaderFunction, json, redirect } from '@remix-run/node';
import { SessionService } from '~/api/modules/session/session.service';
import { TemplateService } from '~/api/modules/template/template.service';
import { UserService } from '~/api/modules/user/user.service';
import { RequestMethods } from '~/enums/requests';
import fromPairs from 'lodash-es/fromPairs';

export const loader: LoaderFunction = async () => {
    return redirect('/404');
};

export const action: ActionFunction = async ({ request }) => {
	await SessionService.requireAuth(request);

	switch (request.method) {
		default: {
			return new Response('Method not allowed', { status: 405 });
		}
	}
};
