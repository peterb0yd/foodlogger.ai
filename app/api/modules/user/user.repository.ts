import { Prisma } from '@prisma/client';
import prisma, { PrismaTxType } from '~/utils/prisma';

export class UserRepository {
	static async findById(id: string, tx: PrismaTxType = prisma) {
		try {
			return await tx.user.findUnique({
				where: { id },
			});
		} catch (error) {
			return null;
		}
	}

    static async findByIdWithSettings (id: string, tx: PrismaTxType = prisma) {
        try {
            return await tx.user.findUnique({
                where: { id },
                include: {
                    settings: true,
                },
            });
        } catch (error) {
            return null;
        }
    }

    static async findByPhone(phone: string, tx: PrismaTxType = prisma) {
        try {
            return await tx.user.findFirst({
                where: { phone },
            });
        } catch (error) {
            return null;
        }
    }

	static async create(user: Prisma.UserUncheckedCreateInput, tx: PrismaTxType = prisma) {
        try {
            return await tx.user.create({
                data: user,
            });
        } catch (error) {
            return null;
        }
    }

    static async update(id: string, user: Prisma.UserUpdateInput, tx: PrismaTxType = prisma) {
        try {
            return await tx.user.update({
                where: { id },
                data: user,
            });
        } catch (error) {
            return null;
        }
    }

	static async findUnique(where: Prisma.UserWhereUniqueInput, tx: PrismaTxType = prisma) {}

	static async findMany() {}

	static async delete(where: Prisma.UserWhereUniqueInput, tx: PrismaTxType = prisma) {}
}
