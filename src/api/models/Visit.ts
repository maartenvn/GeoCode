import { UserIdWrapper } from "@/api/wrappers/UserWrapper";
import Location from "@/api/models/Location";

export default class Visit {
    creator: UserIdWrapper;
    location: Location;
    timestamp: number;
}
