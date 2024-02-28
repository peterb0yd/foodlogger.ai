import { parseFoodItemLogData, getTranscriptionFromAudioFile } from './food-log-item.utils.server';
import { foodItemLogDataToFoodItemLog } from './food-log-item.mappers';
import { FoodLogItemRepository } from './food-log-item.repository';
import { FoodItemService } from '../food-item/food-item.service';
import { FsReadStream } from 'openai/_shims/node-types.mjs';
import { IFoodItemLogData, IFoodLogItemTranscriptionOutput } from './food-log-item.interfaces';

export class FoodLogItemService {
	static async findAllByLogId(logId: string) {
		return FoodLogItemRepository.findAllByLogId(logId);
	}

	// Add a food-log-item to a food-log given the user's text transcription
	static async create(transcription: string, foodLogId: string) {
        console.log('transcription', transcription)
		const foodLogItemData = await parseFoodItemLogData(transcription);

        // If the user said more than one food log, create multiple food logs
        if (Array.isArray(foodLogItemData) && foodLogItemData.length > 0) {
            const inputs = await Promise.all(foodLogItemData.map(async (foodLogItem) => {
                const foodName = foodLogItem.name.toLowerCase();
                const foodItem = await FoodItemService.findByName(foodName);
                if (!foodItem) {
                    throw new Error(`Food item with name "${foodName}" not found`);
                }
                return foodItemLogDataToFoodItemLog({
                    foodLogId,
                    foodItem,
                    foodLogItemData: foodLogItem,
                });
            }));
            return FoodLogItemRepository.createMany(inputs);
        }

        // If the user said only one food log, create one food log
        const singleItemData = foodLogItemData as IFoodLogItemTranscriptionOutput;
		const foodName = singleItemData.name.toLowerCase();
		const foodItem = await FoodItemService.findByName(foodName);
		if (!foodItem) {
			throw new Error(`Food item with name "${foodName}" not found`);
		}
		return FoodLogItemRepository.create(
			foodItemLogDataToFoodItemLog({
				foodLogId,
				foodItem,
				foodLogItemData: singleItemData,
			})
		);
	}

    // Remove a food-log-item from a food-log
    static async delete(foodLogItemId: string) {
        return FoodLogItemRepository.delete(foodLogItemId);
    }
}
