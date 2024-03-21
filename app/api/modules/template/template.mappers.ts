import { ITemplateCreateData, ITemplateCreateInput, ITemplateWithNestedItems, ITemplateWithNestedSelectedItems } from "./template.interfaces";

export const templateDataToCreateInput = (templateData: ITemplateCreateData): ITemplateCreateInput => ({
    name: templateData.name,
    userId: templateData.userId,
});

export const templateWithItemsDto = (template: ITemplateWithNestedSelectedItems): ITemplateWithNestedItems | null => {
    if (!template) return null;
    return {
        ...template,
        items: template.foodLogTemplateItems.map(item => ({
            name: item.foodItem.name,
            quantity: item.quantity,
            unit: item.unit,
            preparation: item.preparation,
        })),
    };
}