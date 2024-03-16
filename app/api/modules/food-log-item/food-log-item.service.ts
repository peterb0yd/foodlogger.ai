import { parseFoodItemLogData } from './food-log-item.utils';
import { FoodLogItemRepository } from './food-log-item.repository';
import { FoodItemService } from '../food-item/food-item.service';
import {
	IFoodLogItemTranscriptionOutput,
	IFoodLogItemUpdateData,
	IFoodLogItemUpdateInput,
	IFoodLogItemWithFoodItem,
} from './food-log-item.interfaces';
import { FoodLogService } from '../food-log/food-log.service';
import prisma, { PrismaTxType } from '~/utils/prisma';
import { FoodLog, Prisma } from '@prisma/client';
import {
	foodLogItemDataToCreateInput,
	foodLogItemDataToUpdateInput,
} from './food-log-item.mappers';
import { BadAudioInputError } from './food-log-item.errors';

/** 
 TODO: 
    - As a user, I want to be able to add food items that don't exist in the database
    - As the owner of the app, I need to be able to see added items clearly and who added them
 */

export class FoodLogItemService {
	static async findAllByLogId(logId: string) {
		return FoodLogItemRepository.findAllByLogId(logId);
	}

	// Add a food-log-item to a food-log given the user's text transcription
	static async create(transcription: string, foodLogId: string) {
        let foodLogItemData;
        try {
            foodLogItemData = await parseFoodItemLogData(transcription);
        } catch (error) {
            throw error;
        }
		console.log('foodLogItemData', JSON.stringify(foodLogItemData, null, 2));
		const foodLog = await FoodLogService.findById(foodLogId);

		if (!foodLog) {
			throw new Error(`Food log with id "${foodLogId}" not found`);
		}

		// Get previous log items if they exist and pull the matching ones for an update
		const previousLogItems = await FoodLogItemRepository.findAllByLogId(foodLogId);

		// Wrap the updates in a transaction
		return await prisma.$transaction(async (tx) => {
			try {
				// If the user said more than one food log, create multiple food logs
				if (Array.isArray(foodLogItemData) && foodLogItemData.length > 0) {
					let { createItems, updateItems } = await this.getCreateAndUpdateFoodLogItems(
						foodLogItemData,
						previousLogItems,
						foodLog,
						tx
					);

					// This update can only change the quantity or unit used for the food-log-item
					for (const updateItem of updateItems) {
						await FoodLogItemRepository.update(updateItem.id, updateItem, tx);
					}

					// Creates the new food-log-items
					if (createItems.length > 0) {
						await FoodLogItemRepository.createMany(createItems, tx);
					}
					return;
				}

				// If the user said only one food log, create one food log
				const singleItemData = foodLogItemData as IFoodLogItemTranscriptionOutput;
				const foodName = singleItemData.name.toLowerCase();
				let foodItem = await FoodItemService.findByName(foodName, tx);
				if (!foodItem) {
					console.log('Creating food item', foodName, 'for user', foodLog.userId);
					foodItem = await FoodItemService.create(foodName, foodLog.userId, tx);
				}

                // Check for existing food-log-item and add to our update here if it exists
				const updateItemInput = this.getExistingFoodLogItemInput(
					previousLogItems,
					foodName,
					singleItemData
				);
				if (updateItemInput) {
					return await FoodLogItemRepository.update(updateItemInput.id, updateItemInput, tx);
				}

                // Create the new food-log-item
				const createInput = foodLogItemDataToCreateInput({
					foodLogId,
					foodItem,
					foodLogItemData: singleItemData,
				});
				return await FoodLogItemRepository.create(createInput, tx);
			} catch (error) {
				console.log('Error creating food-log-item', error);
                throw error;
			}
		});
	}

	// Remove a food-log-item from a food-log
	static async delete(foodLogItemId: string) {
		return FoodLogItemRepository.delete(foodLogItemId);
	}

	// Split new log item data into create and update lists
	private static async getCreateAndUpdateFoodLogItems(
		foodLogItemData: IFoodLogItemTranscriptionOutput | Array<IFoodLogItemTranscriptionOutput>,
		previousLogItems: IFoodLogItemWithFoodItem[] | null,
		foodLog: FoodLog,
		tx?: PrismaTxType
	) {
		let createItems: Prisma.FoodLogItemUncheckedCreateInput[] = [];
		let updateItems: IFoodLogItemUpdateInput[] = [];
		let logItemDataList = foodLogItemData as IFoodLogItemTranscriptionOutput[];
		if (!Array.isArray(foodLogItemData)) {
			logItemDataList = [foodLogItemData];
		}
		await Promise.all(
			logItemDataList.map(async (logItemData) => {
				const foodName = logItemData.name.toLowerCase();
				let foodItem = await FoodItemService.findByName(foodName, tx);
				if (!foodItem) {
					console.log('Creating food item', foodName, 'for user', foodLog.userId);
					foodItem = await FoodItemService.create(foodName, foodLog.userId, tx);
				}
				// Check for existing food-log-item and add to our update list if it exists
				let existingItem;
				if (previousLogItems) {
					existingItem = this.getExistingFoodLogItemInput(previousLogItems, foodName, logItemData);
					if (existingItem) {
						updateItems.push(existingItem);
					}
				}
				// Add to our create list if it doesn't exist
				if (!existingItem) {
					return {
						...foodLogItemDataToCreateInput({
							foodLogId: foodLog.id,
							foodItem,
							foodLogItemData: logItemData,
						}),
					};
				}
			})
		);
		return { createItems, updateItems };
	}

	// Check the existing food-log-items for this log and return the formatted data to update
	private static getExistingFoodLogItemInput(
		foodLogItems: IFoodLogItemWithFoodItem[] | null,
		foodItemName: string,
		updateData: IFoodLogItemTranscriptionOutput
	) {
		let existingItem;
		if (foodLogItems) {
			existingItem = foodLogItems.find((logItem) => logItem.foodItem.name === foodItemName);
			if (existingItem) {
				return foodLogItemDataToUpdateInput({
					foodLogItem: existingItem,
					foodLogItemData: updateData,
				});
			}
		}
		return null;
	}
}
