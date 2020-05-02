import { UserIdWrapper } from "@/api/wrappers/UserWrapper";
import AchConditionField from "@/api/models/AchConditionField";
import AchConditionFilter from "@/api/models/AchConditionFilter";

export default class AchCondition {
    id: number;
    field: AchConditionField;
    filter: AchConditionFilter;
    value: string;
}
