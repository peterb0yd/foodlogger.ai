import { Prisma } from '@prisma/client';
import { getPrisma } from '~/api/utils/prisma';
import { foodLogDataToFoodLog } from './food-log.mappers';

export class FoodLogRepository {
	static async create(foodLog: Prisma.FoodLogCreateInput) {
		const data = Prisma.validator<Prisma.FoodLogCreateInput>()(foodLog);
		try {
			const prisma = getPrisma();
			const createdFoodLog = await prisma.foodLog.create({ data });
			return createdFoodLog;
		} catch (error) {
			throw new Error(`Error creating food item log: ${error}`);
		}
	}
}
