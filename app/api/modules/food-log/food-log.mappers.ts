import { Prisma } from "@prisma/client";
import { IFoodLogRequestData } from "./food-log.interfaces";

export const foodLogDataToFoodLog = (foodLogData: IFoodLogRequestData) => {
    return {
        logTime: new Date(foodLogData.logTime),
        user: {
            connect: {
                id: foodLogData.userId
            }
        }
    } as Prisma.FoodLogCreateInput;
}