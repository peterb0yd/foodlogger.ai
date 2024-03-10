import { User } from '@prisma/client';
import { ActionFunction, LoaderFunction, json, redirect } from '@remix-run/node';
import { FoodLogService } from '~/api/modules/food-log/food-log.service';
import { SessionService } from '~/api/modules/session/session.service';
import { commitSession, destroySession, getSession } from '~/api/modules/session/session.utils';
import { UserService } from '~/api/modules/user/user.service';
import { RequestMethods } from '~/enums/requests';
import { PageRoutes } from '~/enums/routes';

export const loader: LoaderFunction = async () => {
	return new Response(null, {
		status: 405,
		statusText: 'Method Not Allowed',
	});
};

export const action: ActionFunction = async ({ request }) => {
	switch (request.method) {
        // Log in
		case RequestMethods.POST: {
			try {
				const form = await request.formData();
				const phone = form.get('phone') as string;
                console.log({phone})
				// Send a verification text to the user's phone
				await SessionService.sendVerificationText(phone);
                const searchParams = new URLSearchParams();
                searchParams.set('phone', phone);
				return redirect(`${PageRoutes.VERIFY}?${searchParams.toString()}`);
			} catch (error) {
				console.error(error);
				return new Response(null, {
					status: 500,
					statusText: 'Internal Server Error',
				});
			}
		}
        // Verify the login code
		case RequestMethods.PATCH: {
			try {
                const form = await request.formData();
                const phone = form.get("phone") as string;
                const code = form.get("code") as string;
                console.log({ phone, code });
                
                try {
                    await SessionService.verifyCode(phone, code);
                } catch (error) {
                    console.log(error);
                    return redirect(request.referrer);
                }

				const cookie = request.headers.get("Cookie");
				const session = await getSession(cookie);
				let user = await UserService.findByPhone(phone);
				if (!user) {
                    user = await UserService.create({ phone }) as User;
				}

				session.set("userId", user.id);
				const sessionCookie = await commitSession(session);
				// Login succeeded, send them to the home page.
				return redirect(PageRoutes.LOGS, {
				    headers: {
				        "Set-Cookie": sessionCookie,
				    },
				});
			} catch (error) {
				console.error(error);
				return new Response(null, {
					status: 500,
					statusText: 'Internal Server Error',
				});
			}
		}
        // Log out
        case RequestMethods.DELETE: {
            try {
                const cookie = request.headers.get("Cookie");
                const session = await getSession(cookie);
                const deletedCookie = await destroySession(session);
                return redirect(PageRoutes.LOGIN, {
                    headers: {
                        "Set-Cookie": deletedCookie,
                    },
                });
            } catch (error) {
                console.error(error);
                return new Response(null, {
                    status: 500,
                    statusText: "Internal Server Error",
                });
            }
        }
		default: {
			return new Response('Method not allowed', { status: 405 });
		}
	}
};
