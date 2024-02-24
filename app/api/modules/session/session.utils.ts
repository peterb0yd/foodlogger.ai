// app/sessions.ts
import { createSessionStorage } from '@remix-run/node'; // or cloudflare/deno
import { ISessionData } from './session.interfaces';
import { SessionService } from './session.service';
import { Prisma } from '@prisma/client';

const { getSession, commitSession, destroySession } = createSessionStorage<ISessionData>({
	cookie: {
		name: '__session',
		sameSite: 'lax',
        // secure: process.env.NODE_ENV === 'production',
	},
	async createData(data, expires) {
		if (!expires) {
			expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7); // 1 week
		}
		const session = await SessionService.create({
			...data,
			expiresAt: new Date(expires),
		} as Prisma.SessionCreateInput);
		return session.id;
	},
	async readData(id) {
        try {
            console.log('id', id)
            return SessionService.findById(id);
        } catch (error) {
            return null;
        }
	},
	async updateData(id, data, expiresAt) {
		if (!expiresAt) {
			expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7); // 1 week
		}
		await SessionService.updateById(id, {
			...data,
			expiresAt,
		});
	},
	async deleteData(id) {
		await SessionService.deleteById(id);
	},
});

export { getSession, commitSession, destroySession };
