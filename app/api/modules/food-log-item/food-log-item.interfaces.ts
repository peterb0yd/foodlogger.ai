import { FoodItem, FoodLogItem, PreparationMethods, Prisma, Units } from '@prisma/client';

export interface IFoodLogItemWithFoodItem extends FoodLogItem {
	foodItem: FoodItem;
}

export interface ITranscribedFoodLogItem {
    name: string;
    quantity: number;
    unit: Units;
    preparation?: PreparationMethods;
}

export interface IFoodLogItemTranscriptionOutput {
	suggestion?: string;
	logs?: Array<ITranscribedFoodLogItem>;
}

export interface IFoodLogItemCreateData {
	foodItem: Prisma.FoodItemCreateInput;
	foodLogId: string;
	transcribedLog: ITranscribedFoodLogItem;
}

export interface IFoodLogItemCreateInput {
	quantity: number;
	unit: Units;
	preparation: PreparationMethods;
	foodLogId: string;
	foodItemId: string;
}

export interface IFoodLogItemUpdateData {
	foodLogItem: IFoodLogItemWithFoodItem;
	transcribedLog: ITranscribedFoodLogItem;
}

export interface IFoodLogItemUpdateInput {
	id: string;
	quantity?: number;
	unit?: Units;
}
