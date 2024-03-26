import { IFoodLogRequestData } from "./food-log.interfaces";
import { foodLogDataToCreateInput, foodLogWithItemsToDto } from "./food-log.mappers";
import { FoodLogRepository } from "./food-log.repository";
import { startOfIsoDate } from "~/utils/datetime";

export class FoodLogService {
    static async create(foodLogData: IFoodLogRequestData) {
        const { userId, logTime } = foodLogData;
        if (!userId || !logTime) {
            throw new Error('User ID and a LogTime is required');
        }
        const createInput = foodLogDataToCreateInput(foodLogData);
        return FoodLogRepository.create(createInput);
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