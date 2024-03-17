import { Prisma } from "@prisma/client";
import { TemplateFoodLogItemRepository } from "./template-food-log-item.repository";

export class TemplateFoodLogItemService {
    static async create(data: Prisma.TemplateFoodLogItemUncheckedCreateInput) {
        return TemplateFoodLogItemRepository.create(data);
    }

    static async createMany(data: Prisma.TemplateFoodLogItemUncheckedCreateInput[]) {
        return TemplateFoodLogItemRepository.createMany(data);
    }
}