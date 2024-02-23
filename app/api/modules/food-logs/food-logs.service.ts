import { foodLogDataToFoodLog } from "./food-logs.mappers";
import { createFoodLog } from "./food-logs.repository";

export class FoodLogService {
    static async createFoodLog(request: Request) {
        const requestData = await request.formData();
        const userId = requestData.get('userId') as string;
        if (!userId) {
            throw new Error('User ID is required');
        }
        return createFoodLog(
            foodLogDataToFoodLog({ userId }),
        );
    }

}