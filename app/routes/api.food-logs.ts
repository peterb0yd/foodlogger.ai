import { ActionFunction, LoaderFunction, json, redirect } from "@remix-run/node";
import { FoodLogService } from "~/api/modules/food-log/food-log.service";
import { SessionService } from "~/api/modules/session/session.service";
import { RequestMethods } from "~/enums/requests";

export const loader: LoaderFunction = async () => {
    return new Response(null, {
        status: 405,
        statusText: "Method Not Allowed",
    });
}

export const action: ActionFunction = async ({ request }) => {
    await SessionService.requireAuth(request);
    
    switch (request.method) {
        case RequestMethods.POST: {
            try {
                const data = await request.formData();
                const userId = data.get('userId') as string;
                const logTime = data.get('logTime') as string;
                const foodLog = await FoodLogService.create({ userId, logTime });
                return redirect(`/logs/${foodLog.id}`);
            } catch (error) {
                console.error(error);
                return new Response(null, {
                    status: 500,
                    statusText: "Internal Server Error",
                });
            }
        }
        default: {
            return new Response("Method not allowed", { status: 405 });
        }
    }
}