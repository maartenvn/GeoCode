import AchCondition from "@/api/models/AchCondition";

export default class Achievement {
    id: number;
    name: string;
    description: string;
    image: string;
    conditions: Array<AchCondition>;
}
