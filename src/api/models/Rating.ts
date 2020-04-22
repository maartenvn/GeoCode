import { UserIdWrapper } from "@/api/wrappers/UserWrapper";

export default class Rating {
    id: number;
    rating: number;
    message: string;
    creator: UserIdWrapper;
    location: UserIdWrapper;
}
