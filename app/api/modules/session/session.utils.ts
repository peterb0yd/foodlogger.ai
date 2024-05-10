// app/sessions.ts
import { createSessionStorage } from '@remix-run/node'; // or cloudflare/deno
import { ISessionData } from './session.interfaces';
import { SessionService } from './session.service';
import { Prisma } from '@prisma/client';
import { COOKIE_NAME } from './session.constants';
import { DateTime } from 'luxon';

const { getSession, commitSession, destroySession } = createSessionStorage<ISessionData>({
	cookie: {
		name: COOKIE_NAME,
		sameSite: 'lax',
        // secure: process.env.NODE_ENV === 'production',
	},
	async createData(data, expiresAt) {
		if (!expiresAt) {
            expiresAt = DateTime.now().plus({ weeks: 1 }).toJSDate();
		}
		const session = await SessionService.create({
			...data,
			expiresAt,
		} as Prisma.SessionCreateInput);
		return session.id;
	},
	async readData(id) {
        try {
            return SessionService.findById(id);
        } catch (error) {
            return null;
        }
	},
	async updateData(id, data, expiresAt) {
		if (!expiresAt) {
			expiresAt = DateTime.now().plus({ weeks: 1 }).toJSDate();
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
