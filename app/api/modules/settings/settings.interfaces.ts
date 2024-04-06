export interface ISettingsCreateData {
    isTrackingExercise?: boolean;
    isTrackingEnergy?: boolean;
    isTrackingPoop?: boolean;
    isTrackingMood?: boolean;
    isTrackingAnxiety?: boolean;
    isTrackingSleep?: boolean;
}

export interface ISettingsCreateInput {
    userId: string;
    isTrackingExercise?: boolean;
    isTrackingEnergy?: boolean;
    isTrackingPoop?: boolean;
    isTrackingMood?: boolean;
    isTrackingAnxiety?: boolean;
    isTrackingSleep?: boolean;
}