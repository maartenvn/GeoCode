export class AchievementCreateWrapper {
    name?: string;
    description?: string;
    imageId?: string;
    conditions?: Array<AchievementCreateConditionWrapper>;
}

export class AchievementCreateConditionWrapper {
    fieldId: number;
    filterId: number;
    value: string;
}
