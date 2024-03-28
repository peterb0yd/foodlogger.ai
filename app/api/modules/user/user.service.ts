import { Prisma, User } from "@prisma/client";
import { UserRepository } from "./user.repository";
import { UserSettingsService } from "../settings/settings.service";
import { userToUserWithSettings } from "./user.mappers";
import { ISettingsCreateInput } from "../settings/settings.interfaces";

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
    static async create(user: Prisma.UserCreateInput) {
        const newUser = await UserRepository.create(user) as User;
        const settings = await UserSettingsService.create({ userId: newUser.id });
        return userToUserWithSettings(newUser, settings);
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