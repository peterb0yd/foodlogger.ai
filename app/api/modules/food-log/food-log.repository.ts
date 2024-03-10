import { Prisma } from '@prisma/client';
import prisma from '~/utils/prisma';
import { DateTime } from "luxon";

export class FoodLogRepository {
	static async create(foodLog: Prisma.FoodLogCreateInput) {
		const data = Prisma.validator<Prisma.FoodLogCreateInput>()(foodLog);
		try {
			const createdFoodLog = await prisma.foodLog.create({ data });
			return createdFoodLog;
		} catch (error) {
			throw new Error(`Error creating food item log: ${error}`);
		}
	}

    static findById(id: string) {
        return prisma.foodLog.findUnique({
            where: { id },
        });
    }

    static findLogsForDate(userId: string, date: Date) {
        const tomorrowDate = DateTime.fromJSDate(date).plus({ days: 1 }).toJSDate();        
        return prisma.foodLog.findMany({
            where: {
                userId,
                createdAt: {
                    gte: date,
                    lt: tomorrowDate,
                },
            },
        });
    }
}
