import { User, Settings } from "@prisma/client";

export interface IUserWithSettings extends User {
    settings: Settings;
}