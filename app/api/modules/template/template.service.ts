import prisma, { PrismaTxType } from '~/utils/prisma';
import { FoodLogItemService } from '../food-log-item/food-log-item.service';
import {
	ITemplateCreateData,
	ITemplateCreateInput,
	ITemplateUpdateInput,
	ITemplateWithNestedSelectedItems,
} from './template.interfaces';
import { templateDataToCreateInput, templateDataToUpdateInput, templateWithItemsDto } from './template.mappers';
import { TemplateRepository } from './template.repository';
import { TemplateFoodLogItemService } from '../template-food-log-item/template-food-log-item.service';

export class TemplateService {
	// Create a template by finding all food log items and creating a new template with the same items
	static async create(createData: ITemplateCreateData) {
		// Find all food log items
		const foodLogItems = await FoodLogItemService.findAllByLogId(createData.foodLogId);
		if (!foodLogItems) {
			throw new Error(`Error finding food log items by log id`);
		}

		return await prisma.$transaction(async (tx) => {
			try {
				// Create a food log template
				const createInput = templateDataToCreateInput(createData);
				const template = await TemplateRepository.create(createInput, tx);

				// Create food log template items
				await TemplateFoodLogItemService.createMany(foodLogItems, template, tx);

				return await this.findById(template.id, tx);
			} catch (error) {
				throw new Error('Failed to create template from food log');
			}
		});
	}

	static async update(id: string, updateData: ITemplateUpdateInput, tx?: PrismaTxType) {
        const updateInput = templateDataToUpdateInput(updateData);
		return TemplateRepository.update(id, updateInput, tx);
	}

	static async findById(id: string, tx?: PrismaTxType) {
		const template = await TemplateRepository.findById(id, tx);
		if (template) {
			return templateWithItemsDto(template);
		}
	}

	static async findAllByUserId(userId: string) {
		const templates = await TemplateRepository.findAllByUserId(userId);
		return templates.map(templateWithItemsDto);
	}
}
