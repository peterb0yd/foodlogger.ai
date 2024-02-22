import { Prisma } from "@prisma/client";

export const createFoodItemLog = async (foodItem: Prisma.FoodLogCreateInput) => {
    // Create a new food log
    return foodItem;
}