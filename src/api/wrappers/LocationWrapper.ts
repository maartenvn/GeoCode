export class LocationCreateWrapper {
    name: string;
    description: string;
    listed: boolean;
    latitude: number;
    longitude: number;
}

export class LocationUpdateWrapper {
    public name?: string;
    public description?: string;
    public listed?: boolean;
    public active?: boolean;
}
