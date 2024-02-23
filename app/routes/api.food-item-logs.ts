import { ActionFunction, LoaderFunction, json } from "@remix-run/node";
import { createFoodItemLog } from "~/api/modules/food-item-logs/food-item-logs.repository";
import { getFoodItemLogDataFromAudioRequest } from "~/api/modules/food-item-logs/food-item-logs.service";
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
                const foodItemLogData = await getFoodItemLogDataFromAudioRequest(request);
                const foodItemLog = await createFoodItemLog(foodItemLogData);
                return json(foodItemLog);
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