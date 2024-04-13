import { User, Settings, Prisma } from '@prisma/client';
import { IUserCreateData } from './user.interfaces';

export const userDataToCreateInput = (userData: IUserCreateData, settings: Settings) => {
	return {
		phone: userData.phone,
		email: userData.email,
		settingsId: settings.id,
	};
};

export const userToUserWithSettings = (user: User, settings: Settings) => {
	return {
		...user,
		settings,
	};
};

export const userUpdateDataToUpdateInput = (updateData: Prisma.UserUpdateInput) => {
	return {
		name: updateData.name,
		phone: updateData.phone,
		email: updateData.email,
	};
};
