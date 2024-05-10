import { Prisma } from '@prisma/client';
import { PrismaTxType } from '~/utils/prisma';
import prisma from '~/utils/prisma';

export class DailyLogRepository {
	static async create(createInput: Prisma.DailyLogUncheckedCreateInput, tx: PrismaTxType = prisma) {
		const data = Prisma.validator<Prisma.DailyLogUncheckedCreateInput>()(createInput);
		try {
			const createdDailyLog = await tx.dailyLog.create({ data });
			return createdDailyLog;
		} catch (error) {
			throw new Error(`Error creating daily log: ${error}`);
		}
	}

	static async update(
		id: string,
		updateData: Prisma.DailyLogUncheckedUpdateInput,
		tx: PrismaTxType = prisma
	) {
		const data = Prisma.validator<Prisma.DailyLogUncheckedUpdateInput>()(updateData);
		try {
			const updatedDailyLog = await tx.dailyLog.update({ where: { id }, data });
			return updatedDailyLog;
		} catch (error) {
			throw new Error(`Error updating daily log: ${error}`);
		}
	}

    static async findById(id: string, tx: PrismaTxType = prisma) {
        try {
            const dailyLog = await tx.dailyLog.findUnique({ where: { id } });
            return dailyLog;
        } catch (error) {
            throw new Error(`Error finding daily log: ${error}`);
        }
    }

    static async findByDate(userId: string, entryDate: Date, tx: PrismaTxType = prisma) {
        try {
            const dailyLog = await tx.dailyLog.findFirst({
                where: { userId, entryDate },
            });
            return dailyLog;
        } catch (error) {
            throw new Error(`Error finding daily log: ${error}`);
        }
    }
    
}
