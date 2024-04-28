import {  Prisma } from '@prisma/client';
import {
	IFoodLogRequestData,
	IFoodLogWithNestedFoods,
	IFoodLogWithNestedSelectedItems,
} from './food-log.interfaces';
import { DateTime } from 'luxon';

export const foodLogDataToCreateInput = (foodLogData: IFoodLogRequestData) => {
	return {
		loggedAt: DateTime.fromISO(foodLogData.loggedAt).toUTC().toJSDate(),
		user: {
			connect: {
				id: foodLogData.userId,
			},
		},
	} as Prisma.FoodLogCreateInput;
};

export const foodLogWithItemsToDto = (
	foodLogs: IFoodLogWithNestedSelectedItems[]
): IFoodLogWithNestedFoods[] => {
	return (foodLogs ?? []).map((foodLog) => ({
		...foodLog,
		foods: foodLog.foodLogItems.map((foodLogItem) => ({
			name: foodLogItem.foodItem.name,
		})),
	})) as IFoodLogWithNestedFoods[];
};
