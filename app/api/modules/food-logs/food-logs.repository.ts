import { Prisma } from "@prisma/client";
import { getPrisma } from "~/utils/prisma";

export const createFoodLog = async (foodLog: Prisma.FoodLogCreateInput) => {
    const foodLogData = Prisma.validator<Prisma.FoodLogCreateInput>()(foodLog);
    try {
        const prisma = getPrisma();
        const createdFoodLog = await prisma.foodLog.create({
            data: foodLogData,
        });
        return createdFoodLog;
    } catch (error) {
        throw new Error(`Error creating food item log: ${error}`);
    }
}