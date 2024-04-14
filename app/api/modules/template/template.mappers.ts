import { TemplateStatuses } from "@prisma/client";
import { ITemplateCreateData, ITemplateCreateInput, ITemplateUpdateData, ITemplateUpdateInput, ITemplateWithNestedItems, ITemplateWithNestedSelectedItems } from "./template.interfaces";

export const templateDataToCreateInput = (templateData: ITemplateCreateData): ITemplateCreateInput => ({
    name: templateData.name,
    userId: templateData.userId,
});

export const templateDataToUpdateInput = (templateData: ITemplateUpdateData): ITemplateUpdateInput => ({
    name: templateData.name,
    status: TemplateStatuses.PUBLISHED,
});

export const templateWithItemsDto = (template: ITemplateWithNestedSelectedItems): ITemplateWithNestedItems | null => {
    if (!template) return null;
    return {
        ...template,
        items: template.foodLogTemplateItems.map(item => ({
            id: item.id,
            name: item.foodItem.name,
            quantity: item.quantity,
            unit: item.unit,
            preparation: item.preparation,
            foodItemId: item.foodItemId,
        })),
    };
}