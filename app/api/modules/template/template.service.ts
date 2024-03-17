import { dbTransaction } from '~/utils/prisma';
import { FoodLogItemService } from '../food-log-item/food-log-item.service';
import { TemplateFoodLogItemRepository } from '../template-food-log-item/template-food-log-item.repository';
import { ITemplateCreateInput } from './template.interfaces';
import { templateItemDataToItemCreateInput } from './template.mappers';
import { TemplateRepository } from './template.repository';

export class TemplateService {
	// Create a template by finding all food log items and creating a new template with the same items
	static async createFromFoodLog(createData: ITemplateCreateInput) {
		// Find all food log items
		const foodLogItems = await FoodLogItemService.findAllByLogId(createData.foodLogId);
		if (!foodLogItems) {
			throw new Error(`Error finding food log items by log id`);
		}

		return await dbTransaction(async (tx) => {
			// Create a food log template
			const template = await TemplateRepository.create(createData);

			// Create food log template items
			const createdTemplateItems = await TemplateFoodLogItemRepository.createMany(
				templateItemDataToItemCreateInput(foodLogItems, template)
			);

			return {
				...template,
				items: createdTemplateItems,
			};
		});
	}
}