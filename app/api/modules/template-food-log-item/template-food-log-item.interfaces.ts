import { FoodItem, PreparationMethods, TemplateFoodLogItem, Units } from '@prisma/client';

export interface ITemplateFoodLogItemWithNestedSelectedFoodItem extends TemplateFoodLogItem {
	foodItem: FoodItem;
}

export interface ITemplateFoodItem {
    id: string;
	name: string;
	quantity: number;
	unit: Units;
	preparation: PreparationMethods;
    foodItemId: string;
}
