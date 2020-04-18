import { UserIdWrapper } from "@/api/wrappers/UserWrapper";
import { LocationIdWrapper } from "@/api/wrappers/LocationWrapper";

export default class Report {
    id: number;
    message: string;
    reason: string;
    imageId: string;
    creator: UserIdWrapper;
    location: LocationIdWrapper;
}
