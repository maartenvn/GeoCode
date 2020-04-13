import { UserIdWrapper } from "@/api/wrappers/UserWrapper";

export default class Location {
    secretId: string;
    creatorId: number;
    creator: UserIdWrapper;
    name: string;
    description: string;
    latitude: number;
    longitude: number;
    active: boolean;
}
