import { ActionFunction, LoaderFunction, json } from "@remix-run/node";
import { FoodItemLogService } from "~/api/modules/food-item-log/food-item-log.service";
import { parseMultipartFormData } from "~/api/modules/food-item-log/food-item-log.utils";
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
                // Find out what the user said and create one or more food logs from it
                const formData = await parseMultipartFormData(request);
                const audioFile = formData.get('audio') as File;
                const foodLogId = formData.get('foodLogId') as string;
                const foodItemLog = await FoodItemLogService.create(audioFile, foodLogId);
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