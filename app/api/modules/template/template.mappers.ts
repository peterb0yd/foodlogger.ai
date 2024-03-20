import { Template } from "@prisma/client";
import { IFoodLogItemWithFoodItem } from "../food-log-item/food-log-item.interfaces";
import { ITemplateWithNestedItems, ITemplateWithNestedSelectedItems } from "./template.interfaces";

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

export const templateWithItemsDto = (template: ITemplateWithNestedSelectedItems): ITemplateWithNestedItems | null => {
    if (!template) return null;
    return {
        ...template,
        items: template.items.map(item => ({
            name: item.foodItem.name,
            quantity: item.quantity,
            unit: item.unit,
            preparation: item.preparation,
        })),
    };
}