import type {
    ActionFunction,
    ActionFunctionArgs,
    LinksFunction,
    LoaderFunction,
    LoaderFunctionArgs,
} from "@remix-run/node"; // or cloudflare/deno
import { createCookie, json, redirect } from "@remix-run/node"; // or cloudflare/deno
import { Form, useLoaderData } from "@remix-run/react";

import { getSession, commitSession } from "../../api/modules/session/session.utils";
import { UserService } from "~/api/modules/user/user.service";
import { FlexBox, links as flexBoxLinks } from "~/components/flex-box/FlexBox";
import { Text, links as textLinks } from "~/components/text/Text";
import { PageRoutes } from "~/enums/routes";
import { SessionService } from "~/api/modules/session/session.service";

export const links: LinksFunction = () => [
    ...flexBoxLinks(),
    ...textLinks(),
];

export const loader: LoaderFunction = async ({
    request,
}: LoaderFunctionArgs) => {
    const userId = await SessionService.getUserIdFromRequest(request);
    if (userId) {
        // Redirect to the home page if they are already signed in.
        return redirect(PageRoutes.HOME);
    }

    const oldSessionCookie = createCookie('__session', {
        expires: new Date(Date.now() - 1),
    });

    return json({}, {
        headers: {
            "Set-Cookie": await oldSessionCookie.serialize(null),
        },
    });
}

export const action: ActionFunction = async ({
    request,
}: ActionFunctionArgs) => {
    const session = await getSession(
        request.headers.get("Cookie")
    );
    const form = await request.formData();
    const phone = form.get("phone") as string;

    // TODO: redirect to validation page

    const user = await UserService.findByPhone(phone);

    if (!user) {
        throw new Error('User not found');
    }

    session.set("userId", user.id);

    const sessionCookie = await commitSession(session);

    console.log({ sessionCookie })

    // Login succeeded, send them to the home page.
    return redirect("/", {
        headers: {
            "Set-Cookie": sessionCookie,
        },
    });
}

export default function Login() {
    const { error } = useLoaderData<typeof loader>();

    return (
        <Form method="POST">
            <FlexBox col gap="md" justify="center" align="center">
                <Text size="md">Enter your phone number</Text>
                <label>
                    <input type="text" name="phone" />
                </label>
                {error ? <div className="error">{error}</div> : null}
            </FlexBox>
        </Form>
    );
}
