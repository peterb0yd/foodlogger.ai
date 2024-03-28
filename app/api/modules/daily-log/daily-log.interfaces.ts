export interface IDailyLogCreateData {
	isoDate: string;
	userId: string;
	sleepQuality?: number;
	energyQuality?: number;
    exerciseQuality?: number;
	poopQuality?: number;
	moodQuality?: number;
	anxietyQuality?: number;
	notes?: string;
}
