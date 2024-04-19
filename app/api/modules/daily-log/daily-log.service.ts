import { DateTime } from "luxon";
import { IDailyLogCreateData, IDailyLogUpdateData } from "./daily-log.interfaces";
import { dailyLogDataToCreateInput } from "./daily-log.mappers"
import { DailyLogRepository } from "./daily-log.repository";

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
        console.log({isoDate})
        const entryDate = DateTime.fromISO(isoDate).startOf('day').toJSDate();
        return DailyLogRepository.findByDate(userId, entryDate);
    }
}