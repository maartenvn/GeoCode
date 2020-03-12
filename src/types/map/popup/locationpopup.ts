import Location from "@/data/models/Location";

export class LocationPopupPayload {
    /**
     * Location to display inside the popup.
     */
    public location: Location;

    /**
     * Constructor
     * @param location Location
     */
    constructor(location: Location) {
        this.location = location;
    }
}
