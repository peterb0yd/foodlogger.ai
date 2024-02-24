import { IFoodLogRequestData } from "./food-log.interfaces";
import { foodLogDataToFoodLog } from "./food-log.mappers";
import { FoodLogRepository } from "./food-log.repository";

export class FoodLogService {
    static async create(foodLogData: IFoodLogRequestData) {
        const { userId } = foodLogData;
        if (!userId) {
            throw new Error('User ID is required');
        }
        return FoodLogRepository.create(
            foodLogDataToFoodLog({ userId }),
        );
    }

}