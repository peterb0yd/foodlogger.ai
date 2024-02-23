import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { createFoodLogFromAudioRequest } from "../../api/modules/food-logs/food-logs.service";
import { RequestMethods } from "~/enums/requests";

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
                const foodLog = await createFoodLogFromAudioRequest(request);
                return new Response(foodLog, {
                    status: 200,
                    statusText: "OK",
                });
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