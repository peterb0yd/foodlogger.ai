import { Prisma } from "@prisma/client";
import { getPrisma } from "~/utils/prisma";

export const createFoodItemLog = async (foodItemLog: Prisma.FoodItemLogCreateInput) => {
    const foodItemLogData = Prisma.validator<Prisma.FoodItemLogCreateInput>()(foodItemLog);
    try {
        const prisma = getPrisma();
        const createdFoodItem = await prisma.foodItemLog.create({
            data: foodItemLogData,
        });
        return createdFoodItem;
    } catch (error) {
        throw new Error(`Error creating food item log: ${error}`);
    }
}