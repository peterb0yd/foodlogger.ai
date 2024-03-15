import { parseFoodItemLogData, getTranscriptionFromAudioFile } from './food-log-item.utils.server';
import { foodItemLogDataToFoodItemLog } from './food-log-item.mappers';
import { FoodLogItemRepository } from './food-log-item.repository';
import { FoodItemService } from '../food-item/food-item.service';
import { FsReadStream } from 'openai/_shims/node-types.mjs';
import { IFoodItemLogData, IFoodLogItemTranscriptionOutput } from './food-log-item.interfaces';
import { FoodLogService } from '../food-log/food-log.service';
import prisma, { PrismaTxType } from '~/utils/prisma';
import { Prisma } from '@prisma/client';

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
		let foodLogItemData = await parseFoodItemLogData(transcription);
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
					let createItems = await Promise.all(
						foodLogItemData.map(async (foodLogItem) => {
							const foodName = foodLogItem.name.toLowerCase();
							let foodItem = await FoodItemService.findByName(foodName, tx);
							if (!foodItem) {
								console.log('Creating food item', foodName, 'for user', foodLog.userId);
								foodItem = await FoodItemService.create(foodName, foodLog.userId, tx);
							}
							return {
								...foodItemLogDataToFoodItemLog({
									foodLogId,
									foodItem,
									foodLogItemData: foodLogItem,
								}),
							};
						})
					);

					let updateItems: Prisma.FoodLogItemUpdateInput[] = [];
					if (previousLogItems) {
						createItems = createItems.filter((createItem) => {
							const existingItem = previousLogItems.find(
								(prevItem) => prevItem.foodItem.name === createItem.foodItemName
							);
							if (existingItem) {
								updateItems.push({ ...createItem, id: existingItem.id });
								return false;
							}
							return true;
						});
					}

					// This update only can change the quantity or preparation method of the food item
					for (const updateItem of updateItems) {
						await FoodLogItemRepository.update(updateItem.id as string, updateItem, tx);
					}

					// Creates the new food log items
					if (createItems.length > 0) {
                        // This 'foodItemName' property is not in the FoodLogItem model
						createItems = createItems.map((item) => {
							delete item.foodItemName;
                            return item;
						});
						return FoodLogItemRepository.createMany(createItems, tx);
					}
				}

				// If the user said only one food log, create one food log
				const singleItemData = foodLogItemData as IFoodLogItemTranscriptionOutput;
				const foodName = singleItemData.name.toLowerCase();
				let foodItem = await FoodItemService.findByName(foodName, tx);
				if (!foodItem) {
					console.log('Creating food item', foodName, 'for user', foodLog.userId);
					foodItem = await FoodItemService.create(foodName, foodLog.userId, tx);
				}

				const createOrUpdateData = foodItemLogDataToFoodItemLog({
					foodLogId,
					foodItem,
					foodLogItemData: singleItemData,
				});

				if (previousLogItems) {
					const existingItem = previousLogItems.find(
						(logItem) => logItem.foodItem.name === foodItem.name
					);
					if (existingItem) {
						console.log('existingItem', JSON.stringify(existingItem, null, 2));
						return await FoodLogItemRepository.update(existingItem.id, createOrUpdateData, tx);
					}
				}

				console.log('createOrUpdateData', JSON.stringify(createOrUpdateData, null, 2));

				return await FoodLogItemRepository.create(createOrUpdateData, tx);
			} catch (error) {
				console.log('Error creating food log item', error);
			}
		});
	}

	// Remove a food-log-item from a food-log
	static async delete(foodLogItemId: string) {
		return FoodLogItemRepository.delete(foodLogItemId);
	}
}
