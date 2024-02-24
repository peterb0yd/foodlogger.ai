import { getPrisma } from '~/api/utils/prisma';

export class FoodItemsRepository {
	static async findByName(name: string) {
		try {
			const prisma = getPrisma();
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
}
