import { Prisma } from "@prisma/client";
import { FoodItemLogTranscriptionOutput } from "./food-item-log.types";

export interface IFoodItemLogData {
	foodItem: Prisma.FoodItemCreateInput;
	foodLogId: string;
	foodItemLogData: FoodItemLogTranscriptionOutput;
}