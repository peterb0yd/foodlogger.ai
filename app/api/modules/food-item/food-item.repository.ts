import { Prisma } from '@prisma/client';
import prisma from '~/utils/prisma';

export class FoodItemsRepository {
	static async findByName(name: string) {
		try {
			const foodItem = await prisma.foodItem.findFirst({
				where: { name },
			});
			if (!foodItem) {
				return null;
			}
			return foodItem;
		} catch (error) {
			throw new Error(`Error finding food item by name: ${error}`);
		}
	}

    static async create(foodItemData: Prisma.FoodItemUncheckedCreateInput) {
        try {
            if (!foodItemData.createdByUserId) {
                throw new Error('User ID is required to create a food item');
            }
            const data = Prisma.validator<Prisma.FoodItemUncheckedCreateInput>()(foodItemData);
            const foodItem = await prisma.foodItem.create({
                data,
            });
            return foodItem;
        } catch (error) {
            throw new Error(`Error creating food item: ${error}`);
        }
    }

}
