import { FoodLog, Prisma } from "@prisma/client";
import { IFoodLogRequestData, IFoodLogWithNestedFoods, IFoodLogWithNestedSelectedItems } from "./food-log.interfaces";
import { dateAsTimeString } from "~/utils/datetime";

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

export const foodLogWithItemsToDto = (foodLogs: IFoodLogWithNestedSelectedItems[]): IFoodLogWithNestedFoods[] => {
    return (foodLogs ?? []).map(foodLog => ({
        ...foodLog,
        logTimeFormatted: dateAsTimeString(foodLog.logTime as Date),
        foods: foodLog.foodLogItems.map(foodLogItem => ({
            name: foodLogItem.foodItem.name
        }))
    })) as IFoodLogWithNestedFoods[];
}
