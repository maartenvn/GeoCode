import { LatLng } from "leaflet";

export class MapUtil {
    /**
     * Open a coordinate in the chosen map client.
     * @param latLng Coordinates
     */
    static openInMaps(latLng: LatLng) {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        // Open in Google maps when on mobile.
        // Even though Google maps is not open source, most mobile devices use Google Maps.
        // Some Apple devices still use Apple Maps as default, lets not talk about that.
        if (isMobile) {
            window.open(
                `https://maps.google.com/maps?daddr=${latLng.lat},${latLng.lng}`
            );
        }
        // Otherwise, use OpenstreetMap on desktop browsers
        else {
            window.open(
                `https://www.openstreetmap.org/?mlat=${latLng.lat}&mlon=${latLng.lng}&zoom=10`
            );
        }
    }
}
