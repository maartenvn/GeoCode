import { Icon, LatLng, latLng, LatLngExpression } from "leaflet";

export class MapMarker {
    /**
     * Latitude/longitude object
     */
    private latLng: LatLng;

    /**
     * Icon of the marker.
     */
    private icon: Icon | Icon.Default;

    /**
     * Payload to pass to the component inside the popup.
     */
    private popupPayload: unknown;

    /**
     * Constructor
     * @param latLng Latitude/longitude object
     */
    constructor(latLng: LatLng) {
        this.latLng = latLng;
        this.icon = new Icon.Default();
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
     * Get the icon for the marker.
     */
    public getIcon(): Icon | Icon.Default {
        return this.icon;
    }

    /**
     * Set the icon for the marker.
     * @param icon Icon object
     */
    public setIcon(icon: Icon) {
        this.icon = icon;
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
