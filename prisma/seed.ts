import { PrismaClient } from '@prisma/client';
import foodList from './foodList.json';

const prisma = new PrismaClient();

async function runSeeder() {
	try {
		for (const food of foodList) {
			await prisma.foodItem.create({
				data: {
					name: food,
				},
			});
		}
	} catch (error) {
		console.error(error);
		await prisma.$disconnect();
		process.exit(1);
	}

	await prisma.$disconnect();
	console.log('Seeding complete');
}

runSeeder();
