import type {
    LinksFunction,
    LoaderFunction,
    LoaderFunctionArgs,
} from "@remix-run/node"; // or cloudflare/deno
import { createCookie, json, redirect } from "@remix-run/node"; // or cloudflare/deno
import { Form, useLoaderData, useSubmit } from "@remix-run/react";
import { FlexBox, links as flexBoxLinks } from "~/components/flex-box/FlexBox";
import { Text, links as textLinks } from "~/components/text/Text";
import { APIRoutes, PageRoutes } from "~/enums/routes";
import { SessionService } from "~/api/modules/session/session.service";
import { COOKIE_NAME } from "~/api/modules/session/session.constants";
import { RequestMethods } from "~/enums/requests";
import countryCodes from "./countryCodes";
import { useState } from "react";
import { Select, links as selectLinks } from "~/components/select/Select";
import { Input, links as inputLinks } from "~/components/input/Input";
import { Button, links as buttonLinks } from "~/components/button/Button";
import { IconNames } from "~/enums/icons";

export const links: LinksFunction = () => [
    ...flexBoxLinks(),
    ...selectLinks(),
    ...inputLinks(),
    ...textLinks(),
    ...buttonLinks(),
];

export const loader: LoaderFunction = async ({
    request,
}: LoaderFunctionArgs) => {
    await SessionService.requireNoAuth(request);

    // Remove any old cookie by overwriting it with an expired one.
    const oldSessionCookie = createCookie(COOKIE_NAME, {
        expires: new Date(Date.now() - 1),
    });
    return json({}, {
        headers: {
            "Set-Cookie": await oldSessionCookie.serialize(null),
        },
    });
}

export default function Login() {
    const { error } = useLoaderData<typeof loader>();
    const [countryCode, setCountryCode] = useState<string>(countryCodes[0].code);
    const submit = useSubmit();

    const countryCodeOptions = countryCodes.map(({ code, name }) => ({
        value: code,
        label: `${name} (${code})`,
    }));

    const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const phoneNumber = formData.get("phone")?.toString().trim() ?? '';
        const phone = phoneNumber.replace(/[^0-9]*/g, '');
        const formDataToSubmit = new FormData();
        formDataToSubmit.set("phone", `${countryCode}${phone}`);
        submit(formDataToSubmit, {
            method: RequestMethods.POST,
            action: APIRoutes.SESSIONS,
        });
    }

    return (
        <Form onSubmit={onFormSubmit}>
            <FlexBox col gap="lg" justify="center" align="center">
                <Text size="md">Enter your phone number</Text>
                <FlexBox gap="sm" width='max'>
                    <Select
                        value={countryCode}
                        options={countryCodeOptions}
                        name="countryCode"
                        label="Code"
                        size="sm"
                        autoComplete="tel-country-code"
                        onSelect={setCountryCode}
                    />
                    <Input
                        type="tel"
                        name="phone"
                        label="Number"
                        pattern="[0-9]{10}"
                        required
                        autoComplete="tel-national"
                    />
                </FlexBox>
                <Button
                    variant="primary"
                    icon={IconNames.ChevronCircleIcon}
                    iconSize='sm'
                >
                    Login
                </Button>
                {error ? <div className="error">{error}</div> : null}
            </FlexBox>
        </Form >
    );
}