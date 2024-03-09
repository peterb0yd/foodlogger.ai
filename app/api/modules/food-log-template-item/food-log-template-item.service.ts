import { Prisma } from "@prisma/client";
import { FoodLogTemplateItemRepository } from "./food-log-template-item.repository";

export class FoodLogTemplateItemService {
    static async create(data: Prisma.FoodLogTemplateItemUncheckedCreateInput) {
        return FoodLogTemplateItemRepository.create(data);
    }

    static async createMany(data: Prisma.FoodLogTemplateItemUncheckedCreateInput[]) {
        return FoodLogTemplateItemRepository.createMany(data);
    }
}