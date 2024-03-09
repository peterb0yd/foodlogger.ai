import { FoodLogItemService } from '../food-log-item/food-log-item.service';
import { FoodLogTemplateItemRepository } from '../food-log-template-item/food-log-template-item.repository';
import { IFoodLogTemplateCreateInput } from './food-log-template.interfaces';
import { FoodLogTemplateRepository } from './food-log-template.repository';

export class FoodLogTemplateService {
	// Create a template by finding all food log items and creating a new template with the same items
	static async createFromFoodLog(createData: IFoodLogTemplateCreateInput) {
		// Find all food log items
		const foodLogItems = await FoodLogItemService.findAllByLogId(createData.foodLogId);
		if (!foodLogItems) {
			throw new Error(`Error finding food log items by log id`);
		}

		// Create a food log template
		const template = await FoodLogTemplateRepository.create(createData);

		// Create food log template items
		const templateItemsData = foodLogItems.map((item) => {
			return {
				foodItemId: item.foodItemId,
				foodLogTemplateId: template.id,
				quantity: item.quantity,
				unit: item.unit,
			};
		});

		// Create food log template items
		const createdTemplateItems = await FoodLogTemplateItemRepository.createMany(templateItemsData);

		return {
			...template,
			items: createdTemplateItems,
		};
	}
}
