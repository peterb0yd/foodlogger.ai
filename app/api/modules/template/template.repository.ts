import { Prisma } from "@prisma/client";
import { PrismaTxType } from "~/utils/prisma";

export class TemplateRepository {
    static async create(itemData: Prisma.TemplateUncheckedCreateInput, tx: PrismaTxType = prisma) {
		const data = Prisma.validator<Prisma.TemplateUncheckedCreateInput>()(itemData);
		try {
			const createdFoodTemplate = await tx.template.create({ data });
			return createdFoodTemplate;
		} catch (error) {
			throw new Error(`Error creating food log template: ${error}`);
		}
	}
}