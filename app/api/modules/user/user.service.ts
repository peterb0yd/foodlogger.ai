import { Prisma, User } from "@prisma/client";
import { UserRepository } from "./user.repository";
import { UserSettingsService } from "../settings/settings.service";
import { userDataToCreateInput, userToUserWithSettings, userUpdateDataToUpdateInput } from "./user.mappers";
import { ISettingsCreateInput } from "../settings/settings.interfaces";
import { IUserCreateData } from "./user.interfaces";

export class UserService {
    static async findById(id: string) {
        return UserRepository.findById(id);
    }

    static async findByIdWithSettings(id: string) {
        return UserRepository.findByIdWithSettings(id);
    }

    static async findByPhone(phone: string) {
        return UserRepository.findByPhone(phone);
    }

    // Creates a new user and settings
    static async create(createData: IUserCreateData) {
        const settings = await UserSettingsService.create();
        const userCreateInput = userDataToCreateInput(createData, settings);
        const newUser = await UserRepository.create(userCreateInput) as User;
        return userToUserWithSettings(newUser, settings);
    }

    static async update(id: string, updateData: Prisma.UserUpdateInput) {
        const updateInput = userUpdateDataToUpdateInput(updateData);
        await UserRepository.update(id, updateInput);
        return this.findByIdWithSettings(id);
    }

    static async updateSettings(userId: string, settingsData: ISettingsCreateInput) {
        const user = await this.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        const settings = await UserSettingsService.update(user.settingsId, settingsData);
        return userToUserWithSettings(user, settings);
    }
}