import { UserIdWrapper } from "@/api/wrappers/UserWrapper";

export default class Comment {
    id: number;
    message: string;
    creator: UserIdWrapper;
}
