import prisma from '~/utils/prisma';
import { FoodLogItemService } from '../food-log-item/food-log-item.service';
import {
	ITemplateCreateData,
	ITemplateCreateInput,
	ITemplateUpdateInput,
	ITemplateWithNestedSelectedItems,
} from './template.interfaces';
import { templateDataToCreateInput, templateWithItemsDto } from './template.mappers';
import { TemplateRepository } from './template.repository';
import { TemplateFoodLogItemService } from '../template-food-log-item/template-food-log-item.service';

export class TemplateService {
	// Create a template by finding all food log items and creating a new template with the same items
	static async createFromFoodLog(createData: ITemplateCreateData) {
		// Find all food log items
		const foodLogItems = await FoodLogItemService.findAllByLogId(createData.foodLogId);
		if (!foodLogItems) {
			throw new Error(`Error finding food log items by log id`);
		}

		return await prisma.$transaction(async (tx) => {
			// Create a food log template
			const template = await TemplateRepository.create(templateDataToCreateInput(createData), tx);

			// Create food log template items
			await TemplateFoodLogItemService.createMany(
				foodLogItems,
				template,
				tx
			);

			return this.findById(template.id);
		});
	}

	static async update(id: string, updateData: ITemplateUpdateInput) {
		return TemplateRepository.update(id, updateData);
	}

	static async findById(id: string) {
		const template = (await TemplateRepository.findById(
			id
		)) as ITemplateWithNestedSelectedItems | null;
        console.log({template});
		if (template) {
			return templateWithItemsDto(template);
		}
	}
}
