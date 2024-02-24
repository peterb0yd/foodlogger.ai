import { PrismaClient } from '@prisma/client';
import foodList from './foodList.json';

const prisma = new PrismaClient();

async function runSeeder() {
	try {
		for (const food of foodList) {
			await prisma.foodItem.create({
				data: {
					name: food.trim().toLowerCase(),
				},
			});
		}
        
        // Peter Boyd user
        await prisma.user.create({
            data: {
                email: 'peterboyd192@gmail.com',
                phone: '2407235209',
                name: 'Peter Boyd',
            },
        });
	} catch (error) {
		console.error(error);
		await prisma.$disconnect();
		process.exit(1);
	}

	await prisma.$disconnect();
	console.log('Seeding complete');
}

runSeeder();
