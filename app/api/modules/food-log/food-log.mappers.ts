import { Prisma } from "@prisma/client";
import { IFoodLogRequestData } from "./food-log.interfaces";

export const foodLogDataToFoodLog = (foodLogData: IFoodLogRequestData) => {
    return {
        user: {
            connect: {
                id: foodLogData.userId
            }
        }
    } as Prisma.FoodLogCreateInput;
}