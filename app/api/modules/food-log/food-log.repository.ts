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

    static findLogsForDate(userId: string, date: Date, tx: PrismaTxType = prisma) {
        const tomorrowDate = DateTime.fromJSDate(date).plus({ days: 1 }).toJSDate();        
        return tx.foodLog.findMany({
            relationLoadStrategy: "join",
            where: {
                userId,
                createdAt: {
                    gte: date,
                    lt: tomorrowDate,
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
