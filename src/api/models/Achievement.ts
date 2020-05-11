import AchievementCondition from "@/api/models/AchievementCondition";
import AchievementImage from "@/api/models/AchievementImage";

export default class Achievement {
    id: number;
    name: string;
    description: string;
    image: AchievementImage;
    conditions: Array<AchievementCondition>;
    achievedAt?: string;
}
