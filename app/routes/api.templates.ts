import { ActionFunction, LoaderFunction, json, redirect } from '@remix-run/node';
import { SessionService } from '~/api/modules/session/session.service';
import { TemplateService } from '~/api/modules/template/template.service';
import { RequestMethods } from '~/enums/requests';

export const loader: LoaderFunction = async () => {
	return { message: 'Hello, World!' };
};

export const action: ActionFunction = async ({ request }) => {
	await SessionService.requireAuth(request);

	switch (request.method) {
		case RequestMethods.POST: {
			try {
				const data = await request.formData();
				const foodLogId = data.get('foodLogId') as string;
				const userId = data.get('userId') as string;
				const template = await TemplateService.create({
					userId,
					foodLogId,
				});
				if (!template) {
					throw new Error('Failed to create template from food log');
				}
				return redirect(`/templates/${template.id}`);
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
