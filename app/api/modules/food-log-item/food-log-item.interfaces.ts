import { FoodItem, FoodLogItem, PreparationMethods, Prisma, Units } from '@prisma/client';

export interface IFoodLogItemWithFoodItem extends FoodLogItem {
	foodItem: FoodItem;
}

export interface IFoodLogItemTranscriptionOutput {
	name: string;
	quantity: number;
	unit: Units;
	preparation?: PreparationMethods;
}

export interface IFoodLogItemCreateData {
	foodItem: Prisma.FoodItemCreateInput;
	foodLogId: string;
	foodLogItemData: IFoodLogItemTranscriptionOutput;
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
	foodLogItemData: IFoodLogItemTranscriptionOutput;
}

export interface IFoodLogItemUpdateInput {
	id: string;
	quantity?: number;
	unit?: Units;
}
