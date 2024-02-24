import { ActionFunction, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { FoodLogService } from "~/api/modules/food-log/food-log.service";
import { SessionService } from "~/api/modules/session/session.service";
import { Button } from "~/components/button/Button";
import { PageRoutes } from "~/enums/routes";

export const action: ActionFunction = async (context) => {
    const { request } = context;
    const userId = await SessionService.getUserIdFromRequest(request) as string;
    if (!userId) {
        return redirect(PageRoutes.LOGIN);
    }
    // Create new food log and redirect to it's edit page
    const newFoodLog = await FoodLogService.create({ userId });
    return redirect(`/logs/${newFoodLog.id}`);
}

export default function Landing() {
    return (
        <Form method="POST" navigate={false}>
            <Button variant="secondary">Add Log</Button>
        </Form>
    );
}