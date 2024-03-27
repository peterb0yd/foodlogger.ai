import { Prisma } from '@prisma/client';
import prisma, { PrismaTxType } from '~/utils/prisma';
import { DateTime } from "luxon";

export class FoodLogRepository {
	static async create(foodLog: Prisma.FoodLogCreateInput, tx: PrismaTxType = prisma) {
		const data = Prisma.validator<Prisma.FoodLogCreateInput>()(foodLog);
		try {
			const createdFoodLog = await tx.foodLog.create({ data });
			return createdFoodLog;
		} catch (error) {
			throw new Error(`Error creating food item log: ${error}`);
		}
	}

    static findById(id: string, tx: PrismaTxType = prisma) {
        return tx.foodLog.findUnique({
            where: { id },
        });
    }

    static findLogsForDate(userId: string, isoDate: string, tx: PrismaTxType = prisma) {
        const tomorrowDateIso = DateTime.fromISO(isoDate).plus({ days: 1 }).toISO() as string;       
        return tx.foodLog.findMany({
            relationLoadStrategy: "join",
            where: {
                userId,
                createdAt: {
                    gte: isoDate,
                    lt: tomorrowDateIso,
                },
            },
            include: {
                foodLogItems: {
                    include:{
                        foodItem: true,
                    }
                }
            }
        });
    }
}
