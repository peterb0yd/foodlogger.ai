import type {
    ActionFunction,
    ActionFunctionArgs,
    LinksFunction,
    LoaderFunction,
    LoaderFunctionArgs,
} from "@remix-run/node"; // or cloudflare/deno
import { createCookie, json, redirect } from "@remix-run/node"; // or cloudflare/deno
import { Form, useLoaderData, useLocation, useParams, useSearchParams } from "@remix-run/react";
import { FlexBox, links as flexBoxLinks } from "~/components/flex-box/FlexBox";
import { Text, links as textLinks } from "~/components/text/Text";
import { APIRoutes, PageRoutes } from "~/enums/routes";
import { SessionService } from "~/api/modules/session/session.service";
import { COOKIE_NAME } from "~/api/modules/session/session.constants";
import { RequestMethods } from "~/enums/requests";
import { useState } from "react";

export const links: LinksFunction = () => [
    ...flexBoxLinks(),
    ...textLinks(),
];

export const loader: LoaderFunction = async ({
    request,
}: LoaderFunctionArgs) => {
    await SessionService.requireNoAuth(request);
    if (!request.url.includes('phone')) {
        return redirect(PageRoutes.LOGIN);
    }
    return json({});
}

export default function Login() {
    const [error, setError] = useState<string | null>(null);
    const [searchParams,] = useSearchParams();
    const phone = searchParams.get('phone') as string;

    return (
        <FlexBox center col width="full">
            <Form method={RequestMethods.PATCH} action={APIRoutes.SESSIONS}>
                <FlexBox col gap="md" justify="center" align="center">
                    <input type="hidden" name="phone" value={phone} />
                    <Text size="md">Enter your verification code</Text>
                    <label>
                        <input type="text" name="code" />
                    </label>
                    {error ? <div className="error">{error}</div> : null}
                </FlexBox>
            </Form>
        </FlexBox>
    );
}
