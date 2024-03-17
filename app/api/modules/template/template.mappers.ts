import { Template } from "@prisma/client";
import { IFoodLogItemWithFoodItem } from "../food-log-item/food-log-item.interfaces";

export const templateItemDataToItemCreateInput = (foodLogItems: IFoodLogItemWithFoodItem[], template: Template) => {
    return foodLogItems.map((item) => {
        return {
            foodItemId: item.foodItemId,
            templateId: template.id,
            quantity: item.quantity,
            unit: item.unit,
            preparation: item.preparation,
        };
    });
}