import { User, Settings } from "@prisma/client";

export const userToUserWithSettings = (user: User, settings: Settings) => {
    return {
        ...user,
        settings,
    }
}