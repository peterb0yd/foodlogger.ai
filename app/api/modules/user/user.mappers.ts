import { User, Settings } from "@prisma/client";
import { IUserCreateData } from "./user.interfaces";

export const userDataToCreateInput = (userData: IUserCreateData, settings: Settings) => ({
    phone: userData.phone,
    email: userData.email,
    settingsId: settings.id,
})

export const userToUserWithSettings = (user: User, settings: Settings) => {
    return {
        ...user,
        settings,
    }
}