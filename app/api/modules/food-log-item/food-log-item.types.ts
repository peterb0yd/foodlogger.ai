import { PreparationMethods, Units } from "@prisma/client";

export type FoodItemLogTranscriptionOutput = {
    name: string;
    quantity: number;
    unit: Units;
    preparation?: PreparationMethods;
}