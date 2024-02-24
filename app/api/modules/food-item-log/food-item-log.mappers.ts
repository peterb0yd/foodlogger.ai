import { Prisma } from '@prisma/client';
import { IFoodItemLogData } from './food-item-logs.interfaces';

export const foodItemLogDataToFoodItemLog = ({
	foodItem,
	foodLogId,
	foodItemLogData,
}: IFoodItemLogData) => {
    const { quantity, unit, preparation } = foodItemLogData;
	return {
		quantity,
		unit,
		preparation,
		foodLog: {
			connect: {
				id: foodLogId,
			},
		},
		foodItem: {
			connect: {
				id: foodItem.id,
			},
		},
	} as Prisma.FoodItemLogCreateInput;
};
