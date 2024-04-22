import { DateTime } from "luxon";
import { IFoodLogRequestData } from "./food-log.interfaces";
import { foodLogDataToCreateInput, foodLogWithItemsToDto } from "./food-log.mappers";
import { FoodLogRepository } from "./food-log.repository";

export class FoodLogService {
    static async create(foodLogData: IFoodLogRequestData) {
        const { userId, loggedAt } = foodLogData;
        if (!userId || !loggedAt) {
            throw new Error('userId and a loggedAt is required');
        }
        const createInput = foodLogDataToCreateInput(foodLogData);
        return FoodLogRepository.create(createInput);
    }

    static findById(id: string) {
        return FoodLogRepository.findById(id);
    }

    static async findLogsForDate(userId: string, isoDate: string) {
        const startTime = DateTime.fromISO(isoDate).startOf('day').toJSDate();
        const foodLogsWithItems = await FoodLogRepository.findLogsForDate(userId, startTime);
        return foodLogWithItemsToDto(foodLogsWithItems);
    }
}