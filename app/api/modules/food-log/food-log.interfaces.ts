import { FoodLog, FoodLogItem } from "@prisma/client";
import { IFoodLogItemWithFoodItem } from "../food-log-item/food-log-item.interfaces";

export interface IFoodLogRequestData {
    userId: string;
    logTime: string;
}

export interface IFoodLogWithNestedSelectedItems extends FoodLog {
    foodLogItems: IFoodLogItemWithFoodItem[];
}
export interface IFoodLogWithNestedFoods extends Omit<FoodLog, 'logTime' | 'createdAt' | 'updatedAt'> {
    createdAt: Date | string;
    updatedAt: Date | string;
    logTime: Date | string;
    logTimeFormatted: string;
    foods: { name: string; }[];
}