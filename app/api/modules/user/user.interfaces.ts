import { User, Settings } from "@prisma/client";

export interface IUserWithSettings extends User {
    settings: Settings;
}

export interface IUserCreateData {
    phone: string;
    email?: string;
}