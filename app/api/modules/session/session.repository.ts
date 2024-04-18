import { Prisma } from "@prisma/client";
import prisma, { PrismaTxType } from '~/utils/prisma';

export class SessionRepository {
    static async create(session: Prisma.SessionCreateInput, tx: PrismaTxType = prisma) {
        const data = Prisma.validator<Prisma.SessionCreateInput>()(session);
        try {
            const createdSession = await tx.session.create({ data });
            return createdSession;
        } catch (error) {
            throw new Error(`Error creating session: ${error}`);
        }
    }

    static async findById(id: string, tx: PrismaTxType = prisma) {
        try {
            const session = await tx.session.findFirst({
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

    static async updateById(id: string, session: Prisma.SessionUncheckedUpdateInput, tx: PrismaTxType = prisma) {
        const data = Prisma.validator<Prisma.SessionUncheckedUpdateInput>()(session);
        try {
            const updatedSession = await tx.session.update({
                where: { id },
                data,
            });
            return updatedSession;
        } catch (error) {
            throw new Error(`Error updating session by id: ${error}`);
        }
    }

    static async deleteById(id: string, tx: PrismaTxType = prisma) {
        try {
            const session = await tx.session.delete({
                where: { id },
            });
            return session;
        } catch (error) {
            throw new Error(`Error deleting session by id: ${error}`);
        }
    }
}