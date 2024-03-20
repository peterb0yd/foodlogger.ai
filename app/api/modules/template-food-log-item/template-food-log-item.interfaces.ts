import { FoodItem, TemplateFoodLogItem } from "@prisma/client";

export interface ITemplateFoodLogItemWithNestedSelectedFoodItem extends TemplateFoodLogItem {
    foodItem: FoodItem;
}