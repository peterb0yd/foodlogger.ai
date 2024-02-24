import { Prisma } from "@prisma/client";
import { sendVerificationText } from "./user.utils";
import { UserRepository } from "./user.repository";

export class UserService {
    static async findById(id: string) {
        return UserRepository.findById(id);
    }

    static async findByPhone(phone: string) {
        return UserRepository.findByPhone(phone);
    }

    // Creates a new user
    static async create(user: Prisma.UserCreateInput) {
        await sendVerificationText(user.phone as string);
    }

    // Sends a verification code to the user's phone number
    static async login(phone: string) {

    }

    // Verifies the verification code sent to the user's phone number
    static async verify(phone: string, code: string) {

    }
}