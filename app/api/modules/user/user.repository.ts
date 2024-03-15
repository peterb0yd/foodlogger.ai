import { Prisma } from '@prisma/client';
import prisma from '~/utils/prisma';

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

    static async findByPhone(phone: string, tx: PrismaTxType = prisma) {
        try {
            return await tx.user.findFirst({
                where: { phone },
            });
        } catch (error) {
            return null;
        }
    }

	static async create(user: Prisma.UserCreateInput, tx: PrismaTxType = prisma) {
        try {
            return await tx.user.create({
                data: user,
            });
        } catch (error) {
            return null;
        }
    }

	static async findUnique(where: Prisma.UserWhereUniqueInput, tx: PrismaTxType = prisma) {}

	static async findMany() {}

	static async update(where: Prisma.UserWhereUniqueInput, data: Prisma.UserUpdateInput, tx: PrismaTxType = prisma) {}

	static async delete(where: Prisma.UserWhereUniqueInput, tx: PrismaTxType = prisma) {}
}
