import { IFoodItemData } from "./food-item.interfaces";

export const foodItemDataToFoodItemInput = (data: IFoodItemData) => {
    return {
        name: data.name,
        createdByUserId: data.userId,
    };
}