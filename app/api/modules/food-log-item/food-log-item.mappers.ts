import { PreparationMethods, Prisma, Units } from '@prisma/client';
import { IFoodItemLogData } from './food-log-item.interfaces';

export const foodItemLogDataToFoodItemLog = ({
	foodItem,
	foodLogId,
	foodLogItemData,
}: IFoodItemLogData) => {
    const { quantity, unit, preparation } = foodLogItemData;
	return {
		quantity,
		unit: unit.toUpperCase() as Units,
		preparation: preparation?.toUpperCase() as PreparationMethods,
        foodLogId,
        foodItemId: foodItem.id,
	} as Prisma.FoodLogItemUncheckedCreateInput;
};
