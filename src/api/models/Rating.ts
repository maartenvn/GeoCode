import { UserIdWrapper } from "@/api/wrappers/UserWrapper";

export default class Rating {
    creator: UserIdWrapper;
    rating: number;
    message: string;
}
