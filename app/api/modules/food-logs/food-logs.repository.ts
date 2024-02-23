import { Prisma } from "@prisma/client";
import { getPrisma } from "~/utils/prisma";
import { foodLogDataToFoodLog } from "./food-logs.mappers";

export const createFoodLog = async (foodLog: Prisma.FoodLogCreateInput) => {
    const data = Prisma.validator<Prisma.FoodLogCreateInput>()(foodLog);
    try {
        const prisma = getPrisma();
        const createdFoodLog = await prisma.foodLog.create({ data });
        return createdFoodLog;
    } catch (error) {
        throw new Error(`Error creating food item log: ${error}`);
    }
}