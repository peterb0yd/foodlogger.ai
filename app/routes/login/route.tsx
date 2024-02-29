import type {
    ActionFunction,
    ActionFunctionArgs,
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

export const links: LinksFunction = () => [
    ...flexBoxLinks(),
    ...textLinks(),
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

    const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const phoneNumber = formData.get("phone");
        const formDataToSubmit = new FormData();
        formDataToSubmit.set("phone", `${countryCode}${phoneNumber}`);
        submit(formDataToSubmit, {
            method: RequestMethods.POST,
            action: APIRoutes.SESSIONS,
        });
    }

    return (
        <Form onSubmit={onFormSubmit}>
            <FlexBox col gap="md" justify="center" align="center">
                <Text size="md">Enter your phone number</Text>
                <FlexBox gap="sm" width='max'>
                    <CountryCodeSelect value={countryCode} onSelect={setCountryCode} />
                    <label>
                        <input type="text" name="phone" />
                    </label>
                </FlexBox>
                {error ? <div className="error">{error}</div> : null}
            </FlexBox>
        </Form>
    );
}

interface CountryCodeSelectProps {
    value: string;
    onSelect: (value: string) => void;
}

const CountryCodeSelect = ({ value, onSelect }: CountryCodeSelectProps) => {
    return (
        <select value={value} onChange={(e) => onSelect(e.target.value)}>
            {countryCodes.map(({ code, name }) => (
                <option key={code} value={code}>
                    {`${name} (${code})`}
                </option>
            ))}
        </select>
    );
}