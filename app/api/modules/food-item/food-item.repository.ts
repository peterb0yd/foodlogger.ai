import { Prisma } from '@prisma/client';
import prisma, { PrismaTxType } from '~/utils/prisma';

export class FoodItemsRepository {
	static async findByName(name: string, tx: PrismaTxType = prisma) {
		try {
			const foodItem = await tx.foodItem.findFirst({
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

    static async create(foodItemData: Prisma.FoodItemUncheckedCreateInput, tx: PrismaTxType = prisma) {
        try {
            if (!foodItemData.createdByUserId) {
                throw new Error('User ID is required to create a food item');
            }
            const data = Prisma.validator<Prisma.FoodItemUncheckedCreateInput>()(foodItemData);
            const foodItem = await tx.foodItem.create({
                data,
            });
            return foodItem;
        } catch (error) {
            throw new Error(`Error creating food item: ${error}`);
        }
    }

}
