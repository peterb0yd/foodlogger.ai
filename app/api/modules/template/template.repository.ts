import { Prisma, TemplateStatuses } from '@prisma/client';
import { PrismaTxType } from '~/utils/prisma';
import prisma from '~/utils/prisma';

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

	static async update(
		id: string,
		itemData: Prisma.TemplateUncheckedUpdateInput,
		tx: PrismaTxType = prisma
	) {
		const data = Prisma.validator<Prisma.TemplateUncheckedUpdateInput>()(itemData);
		try {
			const updatedTemplate = await tx.template.update({ where: { id }, data });
			return updatedTemplate;
		} catch (error) {
			throw new Error(`Error updating food log template: ${error}`);
		}
	}

	static async findById(id: string, tx: PrismaTxType = prisma) {
		try {
			const template = await tx.template.findUnique({
				where: { id },
				include: {
                    foodLogTemplateItems: {
                        include: {
                            foodItem: true,
                        },
                    },
                },
			});
			return template;
		} catch (error) {
			throw new Error(`Error finding food log template by id: ${error}`);
		}
	}

    static async findAllByUserId(userId: string, tx: PrismaTxType = prisma) {
        try {
            const templates = await tx.template.findMany({
                where: { userId, status: TemplateStatuses.PUBLISHED },
                include: {
                    foodLogTemplateItems: {
                        include: {
                            foodItem: true,
                        },
                    },
                },
            });
            return templates;
        } catch (error) {
            throw new Error(`Error finding food log templates by user id: ${error}`);
        }
    }
}
