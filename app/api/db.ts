import { PrismaClient } from "@prisma/client";

let prisma;

if (!prisma) {
  prisma = new PrismaClient();
  prisma.$connect();
}

export default prisma as PrismaClient;