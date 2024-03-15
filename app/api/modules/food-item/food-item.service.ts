import { PrismaTxType } from "~/utils/prisma";
import { foodItemDataToFoodItemInput } from "./food-item.mappers";
import { FoodItemsRepository } from "./food-item.repository";

export class FoodItemService {
    // Find a single food item by its name
    static findByName(name: string, tx?: PrismaTxType) {
        return FoodItemsRepository.findByName(name, tx)
    }

    // Create a new food item provided by a user
    static async create(name: string, userId: string, tx?: PrismaTxType) {
        try {
            const foodItem = await FoodItemsRepository.create(
                foodItemDataToFoodItemInput({ name, userId }),
                tx
            );
            return foodItem;
        } catch (error) {
            throw new Error(`Error creating food item: ${error}`);
        }
    }
}