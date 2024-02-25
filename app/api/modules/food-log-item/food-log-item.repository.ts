import { Prisma } from '@prisma/client';
import prisma from '~/api/utils/prisma';
import { IFoodLogItemWithFoodItem } from './food-log-item.interfaces';

export class FoodLogItemRepository {
    static async findAllByLogId(logId: string) {
        try {
            const foodLogItems = await prisma.foodLogItem.findMany({
                where: { foodLogId: logId },
                include: {
                    foodItem: true,
                }
            });
            if (!foodLogItems) {
                return null;
            }
            return foodLogItems as IFoodLogItemWithFoodItem[];
        } catch (error) {
            throw new Error(`Error finding food item log by log id : ${error}`);
        }
    }

	static async create(foodLogItem: Prisma.FoodLogItemUncheckedCreateInput) {
		const data = Prisma.validator<Prisma.FoodLogItemUncheckedCreateInput>()(foodLogItem);
		try {
            console.log({data});
			const createdFoodItem = await prisma.foodLogItem.create({ data });
			return createdFoodItem;
		} catch (error) {
			throw new Error(`Error creating food item log: ${error}`);
		}
	}
}
