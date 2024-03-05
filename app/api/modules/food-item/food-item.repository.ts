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
}
