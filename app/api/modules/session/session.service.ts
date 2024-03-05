import { redirect } from '@remix-run/node';
import { SessionRepository } from './session.repository';
import { getSession } from './session.utils';
import { Prisma } from '@prisma/client';
import { twilio } from '~/utils/twilio';
import { PageRoutes } from '~/enums/routes';

export class SessionService {
	static async findById(id: string) {
		return SessionRepository.findById(id);
	}

	static async create(session: Prisma.SessionCreateInput) {
		return SessionRepository.create(session);
	}

	static async updateById(id: string, session: Prisma.SessionUpdateInput) {
		return SessionRepository.updateById(id, session);
	}

	static async deleteById(id: string) {
		return SessionRepository.deleteById(id);
	}

	// Sends a code to the user's phone number
	static async sendVerificationText(phone: string) {
		const verification = await twilio.verify.v2
			.services(process.env.TWILIO_VERIFY_SID as string)
			.verifications.create({ to: phone, channel: 'sms' });
		console.log({ verification });
	}

	// Verifies the code sent to the user's phone number
	static async verifyCode(phone: string, code: string) {
		const verificationCheck = await twilio.verify.v2
			.services(process.env.TWILIO_VERIFY_SID as string)
			.verificationChecks.create({ to: phone, code });
		console.log({ verificationCheck });

		if (verificationCheck.status !== 'approved') {
			throw new Error('Verification failed');
		}
	}

	// Go to login if not authenticated
	static async requireAuth(request: Request) {
		const userId = await this.getUserIdFromRequest(request);
		if (!userId) {
			throw redirect(PageRoutes.LOGIN);
		}
		return userId;
	}

	// Go to home if authenticated
	static async requireNoAuth(request: Request) {
		const userId = await this.getUserIdFromRequest(request);
		if (userId) {
			throw redirect(PageRoutes.HOME);
		}
	}

	// Returns the user id with no redirect
	static async getUserIdFromRequest(request: Request) {
		const userSession = await getSession(request.headers.get('Cookie'));
		return userSession.get('userId');
	}
}
