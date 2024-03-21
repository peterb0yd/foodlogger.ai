import { Template } from "@prisma/client";
import { ITemplateFoodLogItemWithNestedSelectedFoodItem } from "../template-food-log-item/template-food-log-item.interfaces";

export interface ITemplateCreateData {
    name?: string;
    userId: string;
    foodLogId: string;
}

export interface ITemplateCreateInput extends Omit<ITemplateCreateData, 'foodLogId'> {}

export interface ITemplateUpdateInput {
    name: string;
}

export interface ITemplateWithNestedSelectedItems extends Template {
    foodLogTemplateItems: ITemplateFoodLogItemWithNestedSelectedFoodItem[];
}
export interface ITemplateWithNestedItems extends Template {
    items: { 
        name: string; 
        quantity: number;
        unit: string;
        preparation: string;
    }[];
}