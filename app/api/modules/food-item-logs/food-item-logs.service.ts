import { PreparationMethods } from '@prisma/client';
import { findFoodItemByName } from '../food-items/food-items.repository';
import { createFoodItemLog } from './food-item-logs.repository';
import { FoodItemLogTranscriptionOutput } from './food-item-logs.types';
import { getFoodItemLogData } from './food-item-logs.utils';
import { getAudioFileFromRequest, getTranscriptionFromAudioFile } from './food-logs.utils';
import { foodItemLogDataToFoodItemLog } from './food-item-logs.mappers';
import { IFoodItemLogData } from './food-item-logs.interfaces';

// Find out what the user said and create a food log from it
export const getFoodItemLogDataFromAudioRequest = async (request: Request) => {
	const audioFile = await getAudioFileFromRequest(request);
	const transcription = await getTranscriptionFromAudioFile(audioFile);
	return getFoodItemLogData(transcription);
};

// Create a food item log from the user's given formatted transcription data and their food log
export const createFoodLogItem = async (
	foodLogId: string,
	foodItemLogData: FoodItemLogTranscriptionOutput
) => {
	const foodItem = await findFoodItemByName(foodItemLogData.name);
	if (!foodItem) {
		throw new Error(`Food item with name ${foodItemLogData.name} not found`);
	}
	return createFoodItemLog(
		foodItemLogDataToFoodItemLog({ foodLogId, foodItem, ...foodItemLogData } as IFoodItemLogData)
	);
};
