import { Prisma } from "@prisma/client";
import { getPrisma } from "~/api/utils/prisma";

export class SessionRepository {
    static async create(session: Prisma.SessionCreateInput) {
        const data = Prisma.validator<Prisma.SessionCreateInput>()(session);
        try {
            const prisma = getPrisma();
            const createdSession = await prisma.session.create({ data });
            return createdSession;
        } catch (error) {
            throw new Error(`Error creating session: ${error}`);
        }
    }

    static async findById(id: string) {
        try {
            const prisma = getPrisma();
            const session = await prisma.session.findFirst({
                where: { id },
            });
            if (!session) {
                return null;
            }
            return session;
        } catch (error) {
            throw new Error(`Error finding session by id: ${error}`);
        }
    }

    static async updateById(id: string, session: Prisma.SessionUncheckedUpdateInput) {
        const data = Prisma.validator<Prisma.SessionUncheckedUpdateInput>()(session);
        try {
            const prisma = getPrisma();
            const updatedSession = await prisma.session.update({
                where: { id },
                data,
            });
            return updatedSession;
        } catch (error) {
            throw new Error(`Error updating session by id: ${error}`);
        }
    }

    static async deleteById(id: string) {
        try {
            const prisma = getPrisma();
            const session = await prisma.session.delete({
                where: { id },
            });
            return session;
        } catch (error) {
            throw new Error(`Error deleting session by id: ${error}`);
        }
    }
}