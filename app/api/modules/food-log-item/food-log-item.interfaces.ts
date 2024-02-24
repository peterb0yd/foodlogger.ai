import { FoodItem, FoodLogItem, PreparationMethods, Prisma, Units } from "@prisma/client";

export interface IFoodLogItemTranscriptionOutput {
    name: string;
    quantity: number;
    unit: Units;
    preparation?: PreparationMethods;
}

export interface IFoodItemLogData {
	foodItem: Prisma.FoodItemCreateInput;
	foodLogId: string;
	foodLogItemData: IFoodLogItemTranscriptionOutput;
}

export interface IFoodLogItemWithFoodItem extends FoodLogItem {
    foodItem: FoodItem;
}