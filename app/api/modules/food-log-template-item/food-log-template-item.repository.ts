import { Prisma } from "@prisma/client";

export class FoodLogTemplateItemRepository {

	static async create(itemData: Prisma.FoodLogTemplateItemUncheckedCreateInput) {
		const data = Prisma.validator<Prisma.FoodLogTemplateItemUncheckedCreateInput>()(itemData);
		try {
			const createdFoodTemplateItem = await prisma.foodLogTemplateItem.create({ data });
			return createdFoodTemplateItem;
		} catch (error) {
			throw new Error(`Error creating food log template item: ${error}`);
		}
	}

    static async createMany(itemsData: Prisma.FoodLogTemplateItemUncheckedCreateInput[]) {
        const data = Prisma.validator<Prisma.FoodLogTemplateItemUncheckedCreateInput[]>()(itemsData);
        try {
            const createdFoodTemplateItems = await prisma.foodLogTemplateItem.createMany({ data });
            return createdFoodTemplateItems;
        } catch (error) {
            throw new Error(`Error creating food log template items: ${error}`);
        }
    }
}
