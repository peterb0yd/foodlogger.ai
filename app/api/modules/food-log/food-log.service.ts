import { IFoodLogRequestData } from "./food-log.interfaces";
import { foodLogDataToFoodLog } from "./food-log.mappers";
import { FoodLogRepository } from "./food-log.repository";

/** 
 TODO: 
    - As a user, I want to be able to store a set of food items as a meal that I can refer to later using my given name of the meal
 */

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