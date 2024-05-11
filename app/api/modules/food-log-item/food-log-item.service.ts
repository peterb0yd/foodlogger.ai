import { getTranscriptionFromAudioFile, parseFoodLogItemData } from './food-log-item.utils';
import { FoodLogItemRepository } from './food-log-item.repository';
import { FoodItemService } from '../food-item/food-item.service';
import {
	IFoodLogItemTranscriptionOutput,
	IFoodLogItemUpdateInput,
	IFoodLogItemWithFoodItem,
	ITranscribedFoodLogItem,
} from './food-log-item.interfaces';
import { FoodLogService } from '../food-log/food-log.service';
import prisma, { PrismaTxType } from '~/utils/prisma';
import { FoodLog, FoodLogItem, Prisma } from '@prisma/client';
import {
	foodLogItemDataToCreateInput,
	foodLogItemDataToUpdateInput,
	templateToCreateInput,
} from './food-log-item.mappers';
import { TemplateService } from '../template/template.service';

/** 
 TODO: 
    - As the owner of the app, I need to be able to see added items clearly and who added them
 */

export class FoodLogItemService {
	static async findAllByLogId(logId: string) {
		return FoodLogItemRepository.findAllByLogId(logId);
	}

	// Add a food-log-item to a food-log given the user's audio input
	static async create(audioData: string, foodLogId: string) {
		const transcription = await getTranscriptionFromAudioFile(audioData);
        console.log({transcription});
		let foodLogItemData: Array<ITranscribedFoodLogItem> = [];
		let suggestion: string | undefined;
		try {
			const jsonResponse = await parseFoodLogItemData(transcription);
            console.log({jsonResponse});
			foodLogItemData = jsonResponse?.logs ?? [];
			suggestion = jsonResponse?.suggestion;
		} catch (error) {
			throw error;
		}

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
				if (Array.isArray(foodLogItemData) && foodLogItemData?.length > 0) {
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
					let createdItems;
					if (createItems.length > 0) {
						createdItems = await FoodLogItemRepository.createMany(createItems, tx);
					}
					return {
						suggestion,
						foodLogItems: createdItems ?? [],
					};
				}
                return { suggestion };
			} catch (error) {
				console.log('Error creating food-log-item', error);
				throw error;
			}
		});
	}

	// Given a template, create a food-log-item for each item in the template
	static async createFromTemplate(foodLogId: string, templateId: string) {
		const foodLog = await FoodLogService.findById(foodLogId);
		if (!foodLog) {
			throw new Error(`Food log with id "${foodLogId}" not found`);
		}

		const template = await TemplateService.findById(templateId);
		if (!template) {
			throw new Error(`Template with id "${templateId}" not found`);
		}

		const createInputs = templateToCreateInput(template, foodLogId);
		return FoodLogItemRepository.createMany(createInputs);
	}

	// Remove a food-log-item from a food-log
	static async delete(foodLogItemId: string) {
		return FoodLogItemRepository.delete(foodLogItemId);
	}

	// Split new log item data into create and update lists
	private static async getCreateAndUpdateFoodLogItems(
		transcribedLogs: ITranscribedFoodLogItem[],
		previousLogItems: IFoodLogItemWithFoodItem[] | null,
		foodLog: FoodLog,
		tx?: PrismaTxType
	) {
		let createItems: Prisma.FoodLogItemUncheckedCreateInput[] = [];
		let updateItems: IFoodLogItemUpdateInput[] = [];
		await Promise.all(
			transcribedLogs.map(async (transcribedLog) => {
				const foodName = transcribedLog.name.toLowerCase();
				let foodItem = await FoodItemService.findByName(foodName, tx);
				if (!foodItem) {
					console.log('Creating food item', foodName, 'for user ', foodLog.userId);
					foodItem = await FoodItemService.create(foodName, foodLog.userId, tx);
				}
				// Check for existing food-log-item and add to our update list if it exists
				let existingItem;
				if (previousLogItems?.length) {
					existingItem = this.getExistingFoodLogItemInput(
						previousLogItems,
						foodName,
						transcribedLog
					);
					if (existingItem) {
						updateItems.push(existingItem);
					}
				}
				// Add to our create list if it doesn't exist
				if (!existingItem) {
					createItems.push({
						...foodLogItemDataToCreateInput({
							foodLogId: foodLog.id,
							foodItem,
							transcribedLog,
						}),
					});
				}
			})
		);
		return { createItems, updateItems };
	}

	// Check the existing food-log-items for this log and return the formatted data to update
	private static getExistingFoodLogItemInput(
		foodLogItems: IFoodLogItemWithFoodItem[] | null,
		foodItemName: string,
		updateData: ITranscribedFoodLogItem
	) {
		if (foodLogItems) {
			const existingItem = foodLogItems.find((logItem) => logItem.foodItem.name === foodItemName);
			if (existingItem) {
				return foodLogItemDataToUpdateInput({
					foodLogItem: existingItem,
					transcribedLog: updateData,
				});
			}
		}
		return null;
	}
}
