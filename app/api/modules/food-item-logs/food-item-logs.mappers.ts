import { IFoodItemLogData } from './food-item-logs.interfaces';

export const foodItemLogDataToFoodItemLog = ({
	foodItem,
	foodLogId,
	quantity,
	unit,
	preparation,
}: IFoodItemLogData) => {
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
	};
};
