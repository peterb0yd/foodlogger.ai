import { Prisma } from "@prisma/client";
import { PrismaTxType } from "~/utils/prisma";
import prisma from "~/utils/prisma";

export class SettingsRepository {
    static async create(createInput: Prisma.SettingsUncheckedCreateInput, tx: PrismaTxType = prisma) {
        const data = Prisma.validator<Prisma.SettingsUncheckedCreateInput>()(createInput);
        try {
            const createdSettings = await tx.settings.create({ data });
            return createdSettings;
        } catch (error) {
            throw new Error(`Error creating user settings: ${error}`);
        }
    }

    static async update(id: string, updateInput: Prisma.SettingsUncheckedUpdateInput, tx: PrismaTxType = prisma) {
        const data = Prisma.validator<Prisma.SettingsUncheckedUpdateInput>()(updateInput);
        try {
            const updatedSettings = await tx.settings.update({
                where: { id },
                data,
            });
            return updatedSettings;
        } catch (error) {
            throw new Error(`Error updating user settings: ${error}`);
        }
    }
    
}