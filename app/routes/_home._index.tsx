import { Form, useRouteLoaderData, useSubmit } from "@remix-run/react";
import { Button } from "~/components/button/Button";
import { APIRoutes } from "~/enums/routes";
import { loader as rootLoader } from "./_home/route";
import { RequestMethods } from "~/enums/requests";

export default function Landing() {
    const { userId } = useRouteLoaderData<typeof rootLoader>("routes/_home");

    return (
        <Form method={RequestMethods.POST} action={APIRoutes.FOOD_LOGS}>
            <input type="hidden" name="userId" value={userId} />
            <Button variant="secondary">Add Log</Button>
        </Form>
    );
}