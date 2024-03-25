import { IFoodLogRequestData } from "./food-log.interfaces";
import { foodLogDataToFoodLog, foodLogWithItemsToDto } from "./food-log.mappers";
import { FoodLogRepository } from "./food-log.repository";
import { startOfIsoDate } from "~/utils/datetime";

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

    static async findLogsForDate(userId: string, isoDate: string) {
        const startTime = startOfIsoDate(isoDate);
        const foodLogsWithItems = await FoodLogRepository.findLogsForDate(userId, startTime);
        return foodLogWithItemsToDto(foodLogsWithItems);
    }
}