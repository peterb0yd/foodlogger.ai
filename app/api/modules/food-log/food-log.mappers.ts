import { FoodLog, Prisma } from '@prisma/client';
import {
	IFoodLogRequestData,
	IFoodLogWithNestedFoods,
	IFoodLogWithNestedSelectedItems,
} from './food-log.interfaces';
import { DateTime } from 'luxon';
import { TIMESTRING_FORMAT } from '~/utils/datetime';

export const foodLogDataToCreateInput = (foodLogData: IFoodLogRequestData) => {
	return {
		loggedAt: DateTime.fromISO(foodLogData.loggedAt).toJSDate(),
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
		loggedAtFormatted: DateTime.fromJSDate(foodLog.loggedAt as Date).toFormat(TIMESTRING_FORMAT),
		foods: foodLog.foodLogItems.map((foodLogItem) => ({
			name: foodLogItem.foodItem.name,
		})),
	})) as IFoodLogWithNestedFoods[];
};
