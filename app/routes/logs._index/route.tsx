import { Form, useLoaderData } from "@remix-run/react";
import { Button } from "~/components/button/Button";
import { APIRoutes } from "~/enums/routes";
import { RequestMethods } from "~/enums/requests";
import { SessionService } from "~/api/modules/session/session.service";
import { LinksFunction, LoaderFunction, json } from "@remix-run/node";
import { FlexBox, links as flexBoxLinks } from "~/components/flex-box/FlexBox";
import logsStyles from './logs.styles.css';

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: logsStyles },
    ...flexBoxLinks(),
];

export const loader: LoaderFunction = async ({ request }) => {
    const userId = await SessionService.requireAuth(request);
    return json({ userId });
}

export default function Landing() {
    const { userId } = useLoaderData<typeof loader>();

    return (
        <FlexBox col center width="full">
            <Form
                className="form"
                method={RequestMethods.POST}
                action={APIRoutes.FOOD_LOGS}
            >
                <input type="hidden" name="userId" value={userId} />
                <Button variant="secondary">Add Log</Button>
            </Form>
        </FlexBox>
    );
}