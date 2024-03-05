import { Prisma } from '@prisma/client';
import prisma from '~/utils/prisma';

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
}
