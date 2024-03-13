import { DateTime } from "luxon";
import { IFoodLogRequestData } from "./food-log.interfaces";
import { foodLogDataToFoodLog, foodLogWithItemsToDto } from "./food-log.mappers";
import { FoodLogRepository } from "./food-log.repository";

/** 
 TODO: 
    - As a user, I want to be able to store a set of food items as a meal that I can refer to later using my given name of the meal
 */

export class FoodLogService {
    static async create(foodLogData: IFoodLogRequestData) {
        const { userId, logTime } = foodLogData;
        if (!userId || !logTime) {
            throw new Error('User ID and a LogTime is required');
        }
        return FoodLogRepository.create(
            foodLogDataToFoodLog({ userId, logTime }),
        );
    }

    static findById(id: string) {
        return FoodLogRepository.findById(id);
    }

    static async findLogsForDate(userId: string, date: Date) {
        const startOfDate = DateTime.fromJSDate(date).startOf('day').toJSDate();
        const foodLogsWithItems = await FoodLogRepository.findLogsForDate(userId, startOfDate);
        return foodLogWithItemsToDto(foodLogsWithItems);
    }
}