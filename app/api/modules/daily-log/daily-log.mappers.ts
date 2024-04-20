import { Prisma } from "@prisma/client";
import { IDailyLogCreateData, IDailyLogUpdateData } from "./daily-log.interfaces";
import { DateTime } from "luxon";
import { startOfIsoDateAsUtcDate } from "~/utils/datetime";

export const dailyLogDataToCreateInput = (data: IDailyLogCreateData) => {
    return {
        userId: data.userId,
        entryDate: startOfIsoDateAsUtcDate(data.isoDate),
    } as Prisma.DailyLogUncheckedCreateInput;
}