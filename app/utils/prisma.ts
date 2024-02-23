import { PrismaClient } from '@prisma/client';
let client: PrismaClient;

export const getPrisma = () => {
    if (!client) {
        client = new PrismaClient();
    }
    return client;
}