import { redirect } from '@remix-run/node';
import { SessionRepository } from './session.repository';
import { getSession } from './session.utils';
import { Prisma } from '@prisma/client';

export class SessionService {
    static async findById (id: string) {
        return SessionRepository.findById(id);
    }

    static async create (session: Prisma.SessionCreateInput) {
        return SessionRepository.create(session);
    }

    static async updateById (id: string, session: Prisma.SessionUpdateInput) {
        return SessionRepository.updateById(id, session);
    }

    static async deleteById (id: string) {
        return SessionRepository.deleteById(id);
    }

	static async getUserIdFromRequest(request: Request) {
		const session = await getSession(
            request.headers.get("Cookie")
        );
        const userId = session.get('userId');
		return userId;
	}

}
