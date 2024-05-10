import { Prisma } from '@prisma/client';
import { IDailyLogCreateData } from './daily-log.interfaces';
import { DateTime } from 'luxon';

export const dailyLogDataToCreateInput = (data: IDailyLogCreateData) => {
	return {
		userId: data.userId,
		entryDate: DateTime.fromISO(data.isoDate).startOf('day').toJSDate(),
	} as Prisma.DailyLogUncheckedCreateInput;
};
