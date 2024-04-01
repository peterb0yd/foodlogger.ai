import { ActionFunction, LoaderFunction, json, redirect } from '@remix-run/node';
import { BadRequestError } from '~/api/errors/errors.server';
import { SessionService } from '~/api/modules/session/session.service';
import { TemplateService } from '~/api/modules/template/template.service';
import { RequestMethods } from '~/enums/requests';
import { PageRoutes } from '~/enums/routes';

export const loader: LoaderFunction = async () => {
    return redirect('/404');
};

export const action: ActionFunction = async ({ request, params }) => {
    await SessionService.requireAuth(request);

    switch (request.method) {
        case RequestMethods.GET: {
            try {
                const { id } = params;
                if (!id) throw new BadRequestError('No id provided');
                const template = await TemplateService.findById(id as string);
                return json(template);
            }
            catch (error) {
                if (error instanceof BadRequestError) {
                    return new Response(error.message, {
                        status: 400,
                        statusText: 'Bad Request',
                    });
                }
                return new Response(null, {
                    status: 500,
                    statusText: "Internal Server Error",
                });
            }
        }
        case RequestMethods.PATCH: {
            try {
                const { id } = params;
                if (!id) throw new BadRequestError('No id provided');
                const data = await request.formData();
                const name = data.get('name') as string;
                await TemplateService.update(id, { name });
                return redirect(PageRoutes.LOGS);
            }
            catch (error) {
                if (error instanceof BadRequestError) {
                    return new Response(error.message, {
                        status: 400,
                        statusText: 'Bad Request',
                    });
                }
                return new Response(null, {
                    status: 500,
                    statusText: "Internal Server Error",
                });
            }
        }
        default: {
            return new Response("Method not allowed", { status: 405 });
        }
    }
};
