import { DateTime } from "luxon";
import { IFoodLogRequestData } from "./food-log.interfaces";
import { foodLogDataToFoodLog } from "./food-log.mappers";
import { FoodLogRepository } from "./food-log.repository";

/** 
 TODO: 
    - As a user, I want to be able to store a set of food items as a meal that I can refer to later using my given name of the meal
 */

export class FoodLogService {
    static async create(foodLogData: IFoodLogRequestData) {
        const { userId, time } = foodLogData;
        if (!userId || !time) {
            throw new Error('User ID and a Time is required');
        }
        return FoodLogRepository.create(
            foodLogDataToFoodLog({ userId, time }),
        );
    }

    static findById(id: string) {
        return FoodLogRepository.findById(id);
    }

    static findLogsForDate(userId: string, date: Date) {
        const startOfDate = DateTime.fromJSDate(date).startOf('day').toJSDate();
        return FoodLogRepository.findLogsForDate(userId, startOfDate);
    }
}