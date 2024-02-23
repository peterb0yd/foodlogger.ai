import { PreparationMethods, Prisma, Units } from "@prisma/client";

export interface IFoodItemLogData {
	foodItem: Prisma.FoodItemCreateInput;
	foodLogId: string;
	quantity: number;
	unit: Units;
	preparation?: PreparationMethods;
}