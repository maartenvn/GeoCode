import { createModel } from "../struct/Model";
import Config from "@/config";
import Location from "../models/Location";
import Value from "../models/Value";
import FetchHandler from "../FetchHandler";

export class LocationCreate {
    public name: string;
    public description: string;
    public listed: boolean;
    public latitude: number;
    public longitude: number;
}

export default class LocationService {
    /**
     * Get a location by its secret id
     * @param secretId Secret id of the location.
     */
    static get(secretId: string): Promise<Location> {
        return FetchHandler.fetch<Location>({
            url: `${Config.BACKEND.URL}${Config.BACKEND.ENDPOINTS.LOCATIONS}/${secretId}`,
            create: createModel(Location),
            method: "GET"
        });
    }

    /**
     * Get a list with locations.
     */
    static getAll(): Promise<Array<Location>> {
        return FetchHandler.fetch<Array<Location>>({
            url: `${Config.BACKEND.URL}${Config.BACKEND.ENDPOINTS.LOCATIONS}`,
            create: createModel(Location),
            method: "GET"
        });
    }

    /**
     * Create a new location.
     * @param locationCreate Location parameters for the new location.
     */
    static create(locationCreate: LocationCreate): Promise<Value> {
        return FetchHandler.fetch<Value>({
            url: `${Config.BACKEND.URL}${Config.BACKEND.ENDPOINTS.LOCATIONS}`,
            create: createModel(Value),
            method: "POST",
            options: {
                data: locationCreate
            }
        });
    }

    /**
     * Delete a location
     * @param location Location to delete
     */
    static delete(location: Location): Promise<Value> {
        return FetchHandler.fetch<Value>({
            url: `${Config.BACKEND.URL}${Config.BACKEND.ENDPOINTS.LOCATIONS}/${location.secretId}`,
            create: createModel(Value),
            method: "DELETE"
        });
    }
}
