import { Prisma } from "@prisma/client";

export class FoodLogTemplateItemRepository {

	static async create(itemData: Prisma.FoodLogTemplateItemUncheckedCreateInput, tx: PrismaTxType = prisma) {
		const data = Prisma.validator<Prisma.FoodLogTemplateItemUncheckedCreateInput>()(itemData);
		try {
			const createdFoodTemplateItem = await tx.foodLogTemplateItem.create({ data });
			return createdFoodTemplateItem;
		} catch (error) {
			throw new Error(`Error creating food log template item: ${error}`);
		}
	}

    static async createMany(itemsData: Prisma.FoodLogTemplateItemUncheckedCreateInput[], tx: PrismaTxType = prisma) {
        const data = Prisma.validator<Prisma.FoodLogTemplateItemUncheckedCreateInput[]>()(itemsData);
        try {
            const createdFoodTemplateItems = await tx.foodLogTemplateItem.createMany({ data });
            return createdFoodTemplateItems;
        } catch (error) {
            throw new Error(`Error creating food log template items: ${error}`);
        }
    }
}
