import { Prisma } from '@prisma/client';
import prisma, { PrismaTxType } from '~/utils/prisma';
import { IFoodLogItemWithFoodItem } from './food-log-item.interfaces';

export class FoodLogItemRepository {
	static async findAllByLogId(logId: string, tx: PrismaTxType = prisma) {
		try {
			const foodLogItems = await tx.foodLogItem.findMany({
				where: { foodLogId: logId },
				include: {
					foodItem: true,
				},
			});
			if (!foodLogItems) {
				return null;
			}
			return foodLogItems as IFoodLogItemWithFoodItem[];
		} catch (error) {
			throw new Error(`Error finding food item log by log id : ${error}`);
		}
	}

	static async create(
		foodLogItem: Prisma.FoodLogItemUncheckedCreateInput,
		tx: PrismaTxType = prisma
	) {
		const data = Prisma.validator<Prisma.FoodLogItemUncheckedCreateInput>()(foodLogItem);
		try {
			const createdFoodItem = await tx.foodLogItem.create({ data });
			return createdFoodItem;
		} catch (error) {
			throw new Error(`Error creating food item log: ${error}`);
		}
	}

	static async update(
		id: string,
		foodLogItem: Prisma.FoodLogItemUncheckedUpdateInput,
		tx: PrismaTxType = prisma
	) {
		const data = Prisma.validator<Prisma.FoodLogItemUncheckedUpdateInput>()(foodLogItem);
		try {
			const updatedFoodItem = await tx.foodLogItem.update({
				data,
				where: { id },
			});
			return updatedFoodItem;
		} catch (error) {
			throw new Error(`Error updating food item log: ${error}`);
		}
	}

	static async createMany(
		foodLogItems: Prisma.FoodLogItemUncheckedCreateInput[],
		tx: PrismaTxType = prisma
	) {
		const data = Prisma.validator<Prisma.FoodLogItemUncheckedCreateInput[]>()(foodLogItems);
		try {
			const createdFoodItems = await tx.foodLogItem.createMany({ data });
			return createdFoodItems;
		} catch (error) {
			throw new Error(`Error creating food item logs: ${error}`);
		}
	}

	static async delete(foodLogItemId: string, tx: PrismaTxType = prisma) {
		try {
			const deletedFoodLogItem = await tx.foodLogItem.delete({
				where: { id: foodLogItemId },
			});
			return deletedFoodLogItem;
		} catch (error) {
			throw new Error(`Error deleting food item log: ${error}`);
		}
	}
}
