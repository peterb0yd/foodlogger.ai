import { Prisma } from "@prisma/client";
import { IDailyLogCreateData } from "./daily-log.interfaces";

export const dailyLogDataToCreateInput = (data: IDailyLogCreateData) => {
    return {
        userId: data.userId,
        date: new Date(data.isoDate),
        sleepQuality: data.sleepQuality,
        energyQuality: data.energyQuality,
        exerciseQuality: data.exerciseQuality,
        poopQuality: data.poopQuality,
        moodQuality: data.moodQuality,
        anxietyQuality: data.anxietyQuality,
        notes: data.notes,
    } as Prisma.DailyLogUncheckedCreateInput;
}