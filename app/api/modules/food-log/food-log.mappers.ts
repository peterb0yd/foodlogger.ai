import { FoodLog, Prisma } from "@prisma/client";
import { IFoodLogRequestData, IFoodLogWithNestedFoods, IFoodLogWithNestedSelectedItems } from "./food-log.interfaces";
import { dateAsTimeUIString } from "~/utils/datetime";

export const foodLogDataToCreateInput = (foodLogData: IFoodLogRequestData) => {
    return {
        loggedAt: new Date(foodLogData.loggedAt),
        user: {
            connect: {
                id: foodLogData.userId
            }
        }
    } as Prisma.FoodLogCreateInput;
}

export const foodLogWithItemsToDto = (foodLogs: IFoodLogWithNestedSelectedItems[]): IFoodLogWithNestedFoods[] => {
    return (foodLogs ?? []).map(foodLog => ({
        ...foodLog,
        loggedAtFormatted: dateAsTimeUIString(foodLog.loggedAt as Date),
        foods: foodLog.foodLogItems.map(foodLogItem => ({
            name: foodLogItem.foodItem.name
        }))
    })) as IFoodLogWithNestedFoods[];
}
