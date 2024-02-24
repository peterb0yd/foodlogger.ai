import { parseFoodItemLogData, getTranscriptionFromAudioFile } from './food-log-item.utils';
import { foodItemLogDataToFoodItemLog } from './food-log-item.mappers';
import { FoodLogItemRepository } from './food-log-item.repository';
import { FoodItemService } from '../food-item/food-item.service';

export class FoodLogItemService {
	static async findAllByLogId(logId: string) {
		return FoodLogItemRepository.findAllByLogId(logId);
	}

	// Add a food-item-log to a food-log given the user's audio file
	static async create(audioFile: File, foodLogId: string) {
		const transcription = await getTranscriptionFromAudioFile(audioFile);
		const foodLogItemData = await parseFoodItemLogData(transcription);
		const foodName = foodLogItemData.name.toLowerCase();
		const foodItem = await FoodItemService.findByName(foodName);
		if (!foodItem) {
			throw new Error(`Food item with name "${foodName}" not found`);
		}
		return FoodLogItemRepository.create(
			foodItemLogDataToFoodItemLog({
				foodLogId,
				foodItem,
				foodLogItemData,
			})
		);
	}
}
