import { getPrisma } from "~/utils/prisma";

export const findFoodItemByName = async (name: string) => {
    try {
        const prisma = getPrisma();
        const foodItem = await prisma.foodItem.findFirst({
            where: {
                name: name,
            },
        });
        if (!foodItem) {
            return null;
        }
        return foodItem;
    } catch (error) {
        throw new Error(`Error finding food item by name: ${error}`);
    }
}