import { Template, TemplateStatuses } from "@prisma/client";
import { ITemplateFoodItem, ITemplateFoodLogItemWithNestedSelectedFoodItem } from "../template-food-log-item/template-food-log-item.interfaces";

export interface ITemplateCreateData {
    name?: string;
    userId: string;
    foodLogId: string;
}

export interface ITemplateCreateInput extends Omit<ITemplateCreateData, 'foodLogId'> {}

export interface ITemplateUpdateData {
    name: string;
}

export interface ITemplateUpdateInput {
    name: string;
    status: TemplateStatuses;
}

export interface ITemplateWithNestedSelectedItems extends Template {
    foodLogTemplateItems: ITemplateFoodLogItemWithNestedSelectedFoodItem[];
}
export interface ITemplateWithNestedItems extends Template {
    items: ITemplateFoodItem[];
}