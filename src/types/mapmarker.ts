import { LatLng, LatLngExpression, latLng } from "leaflet";

export class MapMarker {
    /**
     * Latitude/longitude object
     */
    private latLng: LatLng;

    /**
     * Payload to pass to the component inside the popup.
     */
    private popupPayload: unknown;

    /**
     * Constructor
     * @param latlng Latitude/longitude object
     */
    constructor(latlng: LatLng) {
        this.latLng = latlng;
    }

    /**
     * Get the latitude/longitude object.
     */
    public getLatLng(): LatLng {
        return this.latLng;
    }

    /**
     * Set the latitude/longitude object.
     * @param latlng Latitude/longitude object
     */
    public setLatLng(latlng: LatLngExpression) {
        this.latLng = latLng(latlng);
    }

    /**
     * Get the popup component payload.
     */
    public getPopupPayload(): unknown {
        return this.popupPayload;
    }

    /**
     * Set the popup component payload.
     * @param payload Component payload
     */
    public setPopupPayload(payload: unknown) {
        this.popupPayload = payload;
    }
}
