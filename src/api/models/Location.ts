import { UserIdWrapper } from "@/api/wrappers/UserWrapper";

export default class Location {
    secretId: string;
    creator: UserIdWrapper;
    name: string;
    description: string;
    latitude: number;
    longitude: number;
    country: string;
    address: string;
    active: boolean;
    rating: number;
}
