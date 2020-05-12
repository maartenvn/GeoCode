import AchievementField from "@/api/models/AchievementField";
import AchievementFilter from "@/api/models/AchievementFilter";

export default class AchievementCondition {
    id: number;
    field: AchievementField;
    filter: AchievementFilter;
    value: string;
}
