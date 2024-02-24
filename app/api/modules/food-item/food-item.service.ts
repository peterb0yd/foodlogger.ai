import { FoodItemsRepository } from "./food-item.repository";

export class FoodItemService {
    // Find a single food item by its name
    static async findByName(name: string) {
        try {
            const foodItem = await FoodItemsRepository.findByName(name);
            return foodItem;
        } catch (error) {
            throw new Error(`Error finding food item by name: ${error}`);
        }
    }
}