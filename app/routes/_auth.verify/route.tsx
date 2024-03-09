import type {
    ActionFunction,
    ActionFunctionArgs,
    LinksFunction,
    LoaderFunction,
    LoaderFunctionArgs,
} from "@remix-run/node"; // or cloudflare/deno
import { json, redirect } from "@remix-run/node"; // or cloudflare/deno
import { Form, useSearchParams } from "@remix-run/react";
import { FlexBox, links as flexBoxLinks } from "~/components/flex-box/FlexBox";
import { Text, links as textLinks } from "~/components/text/Text";
import { APIRoutes, PageRoutes } from "~/enums/routes";
import { SessionService } from "~/api/modules/session/session.service";
import { RequestMethods } from "~/enums/requests";
import { useState } from "react";
import { Input, links as inputLinks } from "~/components/input/Input";
import { Button, links as buttonLinks } from "~/components/button/Button";
import { IconNames } from "~/enums/icons";

export const links: LinksFunction = () => [
    ...flexBoxLinks(),
    ...textLinks(),
    ...inputLinks(),
    ...buttonLinks(),
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
        <Form method={RequestMethods.PATCH} action={APIRoutes.SESSIONS}>
            <FlexBox col gap="lg" justify="center" align="center">
                <input type="hidden" name="phone" value={phone} />
                <Text size="md">Enter your verification code</Text>
                <Input
                    type="tel"
                    required
                    name="code"
                    label="Code"
                    autoComplete="one-time-code"
                />
                <Button
                    variant="primary"
                    icon={IconNames.ChevronCircleIcon}
                    iconSize='sm'
                >
                    Verify
                </Button>
                {error ? <div className="error">{error}</div> : null}
            </FlexBox>
        </Form>
    );
}
