import { ActionFunction, LoaderFunction, json } from "@remix-run/node";
import { RequestMethods } from "~/enums/requests";
import { createFoodLogFromRequest } from "~/api/modules/food-logs/food-logs.service";

export const loader: LoaderFunction = async () => {
    return new Response(null, {
        status: 405,
        statusText: "Method Not Allowed",
    });
}

export const action: ActionFunction = async ({ request }) => {
    switch (request.method) {
        case RequestMethods.POST: {
            try {
                const foodLog = await createFoodLogFromRequest(request);
                return json(foodLog);
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