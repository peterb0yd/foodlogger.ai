import { PreparationMethods, Prisma, Units } from '@prisma/client';
import { IFoodLogItemCreateData, IFoodLogItemCreateInput, IFoodLogItemUpdateData, IFoodLogItemUpdateInput } from './food-log-item.interfaces';
import { ITemplateWithNestedItems } from '../template/template.interfaces';

export const foodLogItemDataToCreateInput = ({
	foodItem,
	foodLogId,
	foodLogItemData,
}: IFoodLogItemCreateData) => {
    const { quantity, unit, preparation } = foodLogItemData;
	return {
		quantity,
		unit: unit.toUpperCase() as Units,
		preparation: preparation?.toUpperCase() as PreparationMethods,
        foodLogId,
        foodItemId: foodItem.id,
	} as IFoodLogItemCreateInput;
};

export const templateToCreateInput = (template: ITemplateWithNestedItems, foodLogId: string) => {
    return template.items.map(item => ({
        quantity: item.quantity,
        unit: item.unit.toUpperCase() as Units,
        preparation: item.preparation?.toUpperCase() as PreparationMethods,
        foodLogId,
        foodItemId: item.foodItemId,
    }));
}

export const foodLogItemDataToUpdateInput = ({
    foodLogItem,
    foodLogItemData,
}: IFoodLogItemUpdateData) => {
    const { quantity, unit } = foodLogItemData;
    return {
        id: foodLogItem.id,
        quantity,
        unit: unit.toUpperCase() as Units,
    } as IFoodLogItemUpdateInput;
}