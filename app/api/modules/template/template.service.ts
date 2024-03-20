import { dbTransaction } from '~/utils/prisma';
import { FoodLogItemService } from '../food-log-item/food-log-item.service';
import { TemplateFoodLogItemRepository } from '../template-food-log-item/template-food-log-item.repository';
import { ITemplateCreateInput, ITemplateUpdateInput, ITemplateWithNestedSelectedItems } from './template.interfaces';
import { templateItemDataToItemCreateInput, templateWithItemsDto } from './template.mappers';
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

    static async update(id: string, updateData: ITemplateUpdateInput) {
        return TemplateRepository.update(id, updateData);
    }

    static async findById(id: string) {
        const template = await TemplateRepository.findById(id) as ITemplateWithNestedSelectedItems | null;
        if (template) {
            return templateWithItemsDto(template);
        }
    }
}
