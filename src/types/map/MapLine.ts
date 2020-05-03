import { LatLng, LatLngTuple } from "leaflet";

export class MapLine {
    /**
     * List of latitude/longitude objects for the line
     */
    public latLngs: Array<LatLng>;

    /**
     * Color of the line
     */
    public color: string;

    /**
     * Create a new MapLine
     * @param latLngs Array of latLng objects.
     */
    constructor(latLngs: Array<LatLng>) {
        this.latLngs = latLngs;
    }

    /**
     * Convert the latLng objects to latLng tuples.
     */
    getLatLngTuples(): Array<LatLngTuple> {
        return this.latLngs.map((latLng) => [latLng.lat, latLng.lng]);
    }
}
