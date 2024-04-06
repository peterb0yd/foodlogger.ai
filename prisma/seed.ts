import { PrismaClient } from '@prisma/client';
import foodList from './foodList.json';
import { UserService } from '~/api/modules/user/user.service';

const prisma = new PrismaClient();

async function runSeeder() {
	try {
		for (const food of foodList) {
			await prisma.foodItem.create({
				data: {
					name: food.trim().toLowerCase(),
                    isApproved: true,
				},
			});
		}
        
        // Peter Boyd user
        await UserService.create({
            email: 'peterboyd192@gmail.com',
            phone: '2407235209',
        })
        
	} catch (error) {
		console.error(error);
		await prisma.$disconnect();
		process.exit(1);
	}

	await prisma.$disconnect();
	console.log('Seeding complete');
}

runSeeder();
