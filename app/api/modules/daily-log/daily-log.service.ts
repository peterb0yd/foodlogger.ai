import { DateTime } from "luxon";
import { IDailyLogCreateData, IDailyLogUpdateData } from "./daily-log.interfaces";
import { dailyLogDataToCreateInput } from "./daily-log.mappers"
import { DailyLogRepository } from "./daily-log.repository";
import { startOfIsoDateAsUtcDate } from "~/utils/datetime";

export class DailyLogService {
    static create = async (createData: IDailyLogCreateData) => {
        const createInput = dailyLogDataToCreateInput(createData);
        return DailyLogRepository.create(createInput);
    }

    static update = async (id: string, updateData: IDailyLogUpdateData) => {
        return DailyLogRepository.update(id, updateData);
    }

    static findById = async (id: string) => {
        return DailyLogRepository.findById(id);
    }
    
    static findByDate = async (userId: string, isoDate: string) => {
        const entryDate = startOfIsoDateAsUtcDate(isoDate);
        return DailyLogRepository.findByDate(userId, entryDate);
    }
}