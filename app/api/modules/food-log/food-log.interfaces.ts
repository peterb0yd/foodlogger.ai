import { FoodLog, FoodLogItem } from "@prisma/client";
import { IFoodLogItemWithFoodItem } from "../food-log-item/food-log-item.interfaces";

export interface IFoodLogRequestData {
    userId: string;
    loggedAt: string;
}

export interface IFoodLogWithNestedSelectedItems extends FoodLog {
    foodLogItems: IFoodLogItemWithFoodItem[];
}
export interface IFoodLogWithNestedFoods extends Omit<FoodLog, 'loggedAt' | 'createdAt' | 'updatedAt'> {
    createdAt: Date | string;
    updatedAt: Date | string;
    loggedAt: Date | string;
    loggedAtFormatted: string;
    foods: { name: string; }[];
}