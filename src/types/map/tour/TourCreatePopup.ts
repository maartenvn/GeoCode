import Location from "@/api/models/Location";

export class TourCreatePopupPayload {
    /**
     * Location to display inside the popup.
     */
    public location: Location;

    /**
     * Action to execute when the user clicks on the action button in the popup.
     */
    public action: (location: Location) => void;

    /**
     * If the location is selected for the tour.
     */
    public selected: boolean;
}
