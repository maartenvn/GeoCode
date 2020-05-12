import { UserIdWrapper } from "@/api/wrappers/UserWrapper";
import { LocationIdWrapper } from "@/api/wrappers/LocationWrapper";
import { ImageIdWrapper } from "@/api/wrappers/ImageIdWrapper";

export default class Report {
    id: number;
    message: string;
    reason: string;
    resolved: boolean;
    image: ImageIdWrapper;
    creator: UserIdWrapper;
    location: LocationIdWrapper;
}
