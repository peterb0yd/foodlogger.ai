declare global {
	var prisma: PrismaClient; // This must be a `var` and not a `let / const`
}

import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

let prisma: PrismaClient;

export type PrismaTxType =
	| PrismaClient
	| Parameters<Parameters<PrismaClient['$transaction']>[0]>[0];

if (process.env.NODE_ENV === 'production') {
	prisma = new PrismaClient();
} else {
	if (!global.prisma) {
		global.prisma = new PrismaClient();
	}
	prisma = global.prisma;
}

export const dbTransaction = prisma.$transaction;

export default prisma;
