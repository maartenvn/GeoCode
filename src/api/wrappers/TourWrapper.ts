import { LocationIdWrapper } from "@/api/wrappers/LocationWrapper";

export class TourIdWrapper {
    secretId: string;
}

export class TourCreateWrapper {
    name?: string;
    description?: string;
    locations?: Array<LocationIdWrapper>;
}

export class TourUpdateWrapper {
    public name?: string;
    public description?: string;
    public listed?: boolean;
}
