import { Form, useLoaderData } from "@remix-run/react";
import { Button } from "~/components/button/Button";
import { APIRoutes } from "~/enums/routes";
import { RequestMethods } from "~/enums/requests";
import { SessionService } from "~/api/modules/session/session.service";
import { LoaderFunction, json } from "@remix-run/node";

export const loader: LoaderFunction = async ({ request }) => {
    await SessionService.requireAuth(request);
    return json({});
}

export default function Landing() {
    const { userId } = useLoaderData<typeof loader>();

    return (
        <Form method={RequestMethods.POST} action={APIRoutes.FOOD_LOGS}>
            <input type="hidden" name="userId" value={userId} />
            <Button variant="secondary">Add Log</Button>
        </Form>
    );
}