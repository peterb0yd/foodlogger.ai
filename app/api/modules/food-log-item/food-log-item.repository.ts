import { Prisma } from '@prisma/client';
import prisma from '~/utils/prisma';
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
			const createdFoodItem = await prisma.foodLogItem.create({ data });
			return createdFoodItem;
		} catch (error) {
			throw new Error(`Error creating food item log: ${error}`);
		}
	}

    static async createMany(foodLogItems: Prisma.FoodLogItemUncheckedCreateInput[]) {
        const data = Prisma.validator<Prisma.FoodLogItemUncheckedCreateInput[]>()(foodLogItems);
        try {
            const createdFoodItems = await prisma.foodLogItem.createMany({ data });
            return createdFoodItems;
        } catch (error) {
            throw new Error(`Error creating food item logs: ${error}`);
        }
    }

    static async delete(foodLogItemId: string) {
        try {
            const deletedFoodLogItem = await prisma.foodLogItem.delete({
                where: { id: foodLogItemId }
            });
            return deletedFoodLogItem;
        } catch (error) {
            throw new Error(`Error deleting food item log: ${error}`);
        }
    }
}
