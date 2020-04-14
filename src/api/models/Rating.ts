import { UserIdWrapper } from "@/api/wrappers/UserWrapper";

export default class Rating {
    rating: number;
    message: string;
    creator: UserIdWrapper;
    location: UserIdWrapper;
}
