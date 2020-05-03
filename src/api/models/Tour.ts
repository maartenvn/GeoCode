import { UserIdWrapper } from "@/api/wrappers/UserWrapper";
import Location from "@/api/models/Location";

export default class Tour {
    secretId: string;
    name: string;
    description: string;
    creator: UserIdWrapper;
    createdAt: string;
    active: boolean;
    locations: Array<Location>;
    totalDistance: number;
}
