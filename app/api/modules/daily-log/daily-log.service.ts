import { IDailyLogCreateData } from "./daily-log.interfaces";
import { dailyLogDataToCreateInput } from "./daily-log.mappers"
import { DailyLogRepository } from "./daily-log.repository";

export class DailyLogService {
    static create = async (createData: IDailyLogCreateData) => {
        const createInput = dailyLogDataToCreateInput(createData);
        return DailyLogRepository.create(createInput);
    }

    static update = async (id: string, updateData: IDailyLogCreateData) => {
        const updateInput = dailyLogDataToCreateInput(updateData);
        return DailyLogRepository.update(id, updateInput);
    }

    static findById = async (id: string) => {
        return DailyLogRepository.findById(id);
    }
}