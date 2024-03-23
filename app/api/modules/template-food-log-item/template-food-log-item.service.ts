import { Prisma, Template } from '@prisma/client';
import { TemplateFoodLogItemRepository } from './template-food-log-item.repository';
import { IFoodLogItemWithFoodItem } from '../food-log-item/food-log-item.interfaces';
import { templateItemDataToItemCreateInput } from './template-food-log-item.mappers';
import { PrismaTxType } from '~/utils/prisma';

export class TemplateFoodLogItemService {
	static async create(data: Prisma.TemplateFoodLogItemUncheckedCreateInput) {
		return TemplateFoodLogItemRepository.create(data);
	}

	static async createMany(
		foodLogItems: IFoodLogItemWithFoodItem[],
		template: Template,
		tx?: PrismaTxType
	) {
        const items = templateItemDataToItemCreateInput(foodLogItems, template);
		return TemplateFoodLogItemRepository.createMany(items, tx);
	}

    static async delete(templateId: string) {
        return TemplateFoodLogItemRepository.delete(templateId);
    }
}
