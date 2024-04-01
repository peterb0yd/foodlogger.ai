import { ISettingsCreateInput } from "./settings.interfaces";
import { SettingsRepository } from "./settings.repository";

export class UserSettingsService {
    static async create(createInput?: ISettingsCreateInput) {
        return SettingsRepository.create(createInput ?? {});
    }

    static async update(id: string, updateInput: ISettingsCreateInput) {
        return SettingsRepository.update(id, updateInput);
    }
}