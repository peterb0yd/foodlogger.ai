import { ActionFunction, LoaderFunction, json } from "@remix-run/node";
import { FoodLogItemService } from "~/api/modules/food-log-item/food-log-item.service";
import { parseMultipartFormData } from "~/api/modules/food-log-item/food-log-item.utils";
import { RequestMethods } from "~/enums/requests";

export const loader: LoaderFunction = async () => {
    return new Response(null, {
        status: 405,
        statusText: "Method Not Allowed",
    });
}

export const action: ActionFunction = async (context) => {
    const { request, params } = context;
    switch (request.method) {
        case RequestMethods.POST: {
            try {
                // Find out what the user said and create one or more food logs from it
                const formData = await parseMultipartFormData(request);
                const audioFile = formData.get('audio') as File;
                const foodLogId = params.id as string;
                const foodItemLog = await FoodLogItemService.create(audioFile, foodLogId);
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