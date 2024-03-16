import { PreparationMethods, Prisma, Units } from '@prisma/client';
import { IFoodLogItemCreateData, IFoodLogItemCreateInput, IFoodLogItemUpdateData, IFoodLogItemUpdateInput } from './food-log-item.interfaces';

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