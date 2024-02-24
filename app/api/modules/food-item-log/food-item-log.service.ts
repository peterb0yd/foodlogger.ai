import { FoodItemLogTranscriptionOutput } from './food-item-log.types';
import {
	parseFoodItemLogData,
	getTranscriptionFromAudioFile,
} from './food-item-log.utils';
import { foodItemLogDataToFoodItemLog } from './food-item-log.mappers';
import { FoodItemLogRepository } from './food-item-log.repository';
import { FoodItemService } from '../food-item/food-item.service';

export class FoodItemLogService {
    static async findAllByLogId (logId: string) {
        return FoodItemLogRepository.findAllByLogId(logId);
    }

	// Add a food-item-log to a food-log given the user's audio file 
	static async create(
        audioFile: File,
		foodLogId: string,
	) {
		const transcription = await getTranscriptionFromAudioFile(audioFile);
		const foodItemLogData = await parseFoodItemLogData(transcription);
		const foodItem = await FoodItemService.findByName(foodItemLogData.name);
		if (!foodItem) {
			throw new Error(`Food item with name ${foodItemLogData.name} not found`);
		}
		return FoodItemLogRepository.create(
			foodItemLogDataToFoodItemLog({
				foodLogId,
				foodItem,
				foodItemLogData,
			})
		);
	}
}
