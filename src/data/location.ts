import { fetchData } from "@/util/fetchutil";
import { createModel } from "./struct/Model";
import Location from "./models/Location";

/**
 * Get a location by its secret id
 * @param secretId Secret id of the location.
 */
export function getLocation(secretId: string): Promise<Location> {
    return fetchData<Location>({
        url: "http://localhost:3000/location.json",
        create: createModel(Location),
        method: "GET"
    });
}

export function getLocations(): Promise<Array<Location>> {
    return fetchData<Array<Location>>({
        url: "http://localhost:3000/locations.json",
        create: createModel(Location),
        method: "GET"
    });
}
