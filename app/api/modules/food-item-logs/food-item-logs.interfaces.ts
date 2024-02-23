import { PreparationMethods, Prisma, Units } from "@prisma/client";
import { FoodItemLogTranscriptionOutput } from "./food-item-logs.types";

export interface IFoodItemLogData {
	foodItem: Prisma.FoodItemCreateInput;
	foodLogId: string;
	foodItemLogData: FoodItemLogTranscriptionOutput;
}