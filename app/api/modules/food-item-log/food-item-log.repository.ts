import { Prisma } from '@prisma/client';
import { getPrisma } from '~/api/utils/prisma';

export class FoodItemLogRepository {
    static async findAllByLogId(logId: string) {
        try {
            const prisma = getPrisma();
            const foodItemLogs = await prisma.foodItemLog.findMany({
                where: { id: logId },
            });
            if (!foodItemLogs) {
                return null;
            }
            return foodItemLogs;
        } catch (error) {
            throw new Error(`Error finding food item log by log id: ${error}`);
        }
    }

	static async create(foodItemLog: Prisma.FoodItemLogCreateInput) {
		const data = Prisma.validator<Prisma.FoodItemLogCreateInput>()(foodItemLog);
		try {
			const prisma = getPrisma();
			const createdFoodItem = await prisma.foodItemLog.create({ data });
			return createdFoodItem;
		} catch (error) {
			throw new Error(`Error creating food item log: ${error}`);
		}
	}
}
