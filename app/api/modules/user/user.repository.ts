import { Prisma } from '@prisma/client';
import { getPrisma } from '~/api/utils/prisma';

export class UserRepository {
	static async findById(id: string) {
		try {
			const prisma = getPrisma();
			return await prisma.user.findUnique({
				where: { id },
			});
		} catch (error) {
			return null;
		}
	}

    static async findByPhone(phone: string) {
        try {
            const prisma = getPrisma();
            return await prisma.user.findFirst({
                where: { phone },
            });
        } catch (error) {
            return null;
        }
    }

	static async create(user: Prisma.UserCreateInput) {}

	static async findUnique(where: Prisma.UserWhereUniqueInput) {}

	static async findMany() {}

	static async update(where: Prisma.UserWhereUniqueInput, data: Prisma.UserUpdateInput) {}

	static async delete(where: Prisma.UserWhereUniqueInput) {}
}
