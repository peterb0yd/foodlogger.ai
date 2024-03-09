import { Prisma } from "@prisma/client";

export class FoodLogTemplateRepository {
    static async create(itemData: Prisma.FoodLogTemplateUncheckedCreateInput) {
		const data = Prisma.validator<Prisma.FoodLogTemplateUncheckedCreateInput>()(itemData);
		try {
			const createdFoodTemplate = await prisma.foodLogTemplate.create({ data });
			return createdFoodTemplate;
		} catch (error) {
			throw new Error(`Error creating food log template: ${error}`);
		}
	}
}