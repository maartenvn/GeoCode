export class CoordinatesUtil {
    /**
     * Convert a coordinate to degrees.
     * @param coordinate
     */
    static toDMS(coordinate: number): string {
        const absolute = Math.abs(coordinate);
        const degrees = Math.floor(absolute);
        const minutesDiff = (absolute - degrees) * 60;
        const minutes = Math.floor(minutesDiff);
        const seconds = Math.floor((minutesDiff - minutes) * 60);

        return degrees + "° " + minutes + "' " + seconds + "''";
    }

    /**
     * Convert latitude to degrees.
     * @param lat Latitude
     */
    static latToDMS(lat: number): string {
        const latitude = this.toDMS(lat);
        const latitudeCardinal = lat >= 0 ? "N" : "S";

        return `${latitude} ${latitudeCardinal}`;
    }

    /**
     * Convert longitude to degrees.
     * @param lng Longitude
     */
    static lngToDMS(lng: number): string {
        const longitude = this.toDMS(lng);
        const longitudeCardinal = lng >= 0 ? "E" : "W";

        return `${longitude} ${longitudeCardinal}`;
    }
}
