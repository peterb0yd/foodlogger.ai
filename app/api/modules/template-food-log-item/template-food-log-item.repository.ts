import { Prisma } from "@prisma/client";
import { PrismaTxType } from "~/utils/prisma";

export class TemplateFoodLogItemRepository {

	static async create(itemData: Prisma.TemplateFoodLogItemUncheckedCreateInput, tx: PrismaTxType = prisma) {
		const data = Prisma.validator<Prisma.TemplateFoodLogItemUncheckedCreateInput>()(itemData);
		try {
			const createdTemplateFoodLogItem = await tx.templateFoodLogItem.create({ data });
			return createdTemplateFoodLogItem;
		} catch (error) {
			throw new Error(`Error creating food log template item: ${error}`);
		}
	}

    static async createMany(itemsData: Prisma.TemplateFoodLogItemUncheckedCreateInput[], tx: PrismaTxType = prisma) {
        const data = Prisma.validator<Prisma.TemplateFoodLogItemUncheckedCreateInput[]>()(itemsData);
        try {
            const createdTemplateFoodLogItems = await tx.templateFoodLogItem.createMany({ data });
            return createdTemplateFoodLogItems;
        } catch (error) {
            throw new Error(`Error creating food log template items: ${error}`);
        }
    }

    static async delete(id: string, tx: PrismaTxType = prisma) {
        try {
            await tx.templateFoodLogItem.delete({
                where: { id },
            });
        } catch (error) {
            throw new Error(`Error deleting food log template items: ${error}`);
        }
    }
}
