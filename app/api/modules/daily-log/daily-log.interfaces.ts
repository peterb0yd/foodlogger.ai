export interface IDailyLogCreateData {
	isoDate: string;
	userId: string;
}

export interface IDailyLogUpdateData {
    sleepQuality?: number;
	energyQuality?: number;
    exerciseQuality?: number;
	poopQuality?: number;
	moodQuality?: number;
	anxietyQuality?: number;
	notes?: string;
}