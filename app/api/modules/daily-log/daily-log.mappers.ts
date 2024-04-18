import { Prisma } from "@prisma/client";
import { IDailyLogCreateData } from "./daily-log.interfaces";
import { DateTime } from "luxon";

export const dailyLogDataToCreateInput = (data: IDailyLogCreateData) => {
    return {
        userId: data.userId,
        entryDate: DateTime.fromISO(data.isoDate).startOf('day').toISODate(),
        sleepQuality: data.sleepQuality,
        energyQuality: data.energyQuality,
        exerciseQuality: data.exerciseQuality,
        poopQuality: data.poopQuality,
        moodQuality: data.moodQuality,
        anxietyQuality: data.anxietyQuality,
        notes: data.notes,
    } as Prisma.DailyLogUncheckedCreateInput;
}