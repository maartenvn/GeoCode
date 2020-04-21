import UserAvatar from "@/api/models/UserAvatar";

export default class User {
    id: number;
    username: string;
    email: string;
    avatar: UserAvatar;
}
