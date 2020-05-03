<template>
    <div style="height: 100%; width: 100%;">
        <!-- Loading -->
        <template v-if="showLocations && locations.isLoading()">
            <v-skeleton-loader dense type="image" />
        </template>

        <!-- Data -->
        <template v-else-if="!showLocations || locations.isSuccess()">
            <marker-map
                class="ma-auto"
                :height="height"
                :width="width"
                :zoom="zoom"
                :center="center"
                :markers="markers"
                :lines="lines"
                :popupComponent="popupComponent"
                :searchEnabled="searchEnabled"
                @searchClick="onSearchClick"
            />
        </template>

        <!-- Error -->
        <template v-else-if="showLocations && locations.isError()">
            <error-placeholder error-id="locations" />
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue } from "vue-property-decorator";
import { EchoPromise } from "echofetch";
import { RequestHandler } from "@/api/RequestHandler";
import { MapMarker } from "@/types/map/MapMarker";
import { Icon, LatLng, Map } from "leaflet";
import Location from "@/api/models/Location";
import LocationService from "@/api/services/LocationService";
import ErrorPlaceholder from "@/components/error/ErrorPlaceholder.vue";
import MarkerMap from "@/components/map/MarkerMap.vue";
import { TourCreatePopupPayload } from "@/types/map/tour/TourCreatePopup";
import { ArrayUtil } from "@/util/ArrayUtil";
import TourCreatePopup from "@/components/map/popup/TourCreatePopup.vue";
import { MapLine } from "@/types/map/MapLine";
import LocationPopup from "@/components/map/popup/LocationPopup.vue";

@Component({
    components: { MarkerMap, ErrorPlaceholder },
})
export default class TourMap extends Vue {
    /**
     * List of locations for the specific tour.
     * The order of the locations in the array is the order of the tour.
     */
    @PropSync("tourLocations")
    _tourLocations: Array<Location>;

    /**
     * Height of the map.
     */
    @Prop()
    height: number;

    /**
     * Width of the map.
     */
    @Prop()
    width: number;

    /**
     * Center of the map.
     */
    @Prop()
    center: Array<number>;

    /**
     * Zoom level of the map.
     */
    @Prop()
    zoom: number;

    /**
     * Should the search bar be visible & enabled
     */
    @Prop({ default: false })
    searchEnabled: boolean;

    /**
     * Should all the locations, beside the tour locations, be shown.
     */
    @Prop({ default: false })
    showLocations: boolean;

    /**
     * Should the select menu on locations be shown.
     * True is used when creating a tour.
     * When false it will show the location information instead.
     */
    @Prop({ default: false })
    showSelect: boolean;

    /**
     * Component to display inside the popup of a marker.
     */
    get popupComponent(): unknown {
        return this.showSelect ? TourCreatePopup : LocationPopup;
    }

    /**
     * List with all the available locations.
     */
    locations?: EchoPromise<Array<Location>> | null = this.showLocations
        ? RequestHandler.handle(LocationService.getAll(), {
              id: "locations",
              style: "SECTION",
          })
        : null;

    /**
     * When the user clicks on a search result.
     * Go to the coordinates on the map.
     * @param result Search result of a search provider.
     * @param map Map object.
     */
    onSearchClick(result: any, map: Map) {
        // Go to the marker location.
        map.flyTo([result.y, result.x], 15);
    }

    /**
     * Get a list with markers, based on the list with tour locations & all other locations.
     */
    get markers(): Array<MapMarker> {
        const _markers = new Array<MapMarker>();

        // Add the tour locations.
        for (const tourLocation of this._tourLocations) {
            const latLng = new LatLng(
                tourLocation.latitude,
                tourLocation.longitude
            );

            const marker = new MapMarker(latLng);

            // Create the popup payload.
            const popupPayload = new TourCreatePopupPayload();
            popupPayload.location = tourLocation;
            popupPayload.selected = true;
            popupPayload.action = (location) =>
                ArrayUtil.delete(this._tourLocations, location);
            marker.setPopupPayload(popupPayload);

            // Set a red icon for the tour markers.
            // Only do this when "showSelect" is true
            if (this.showSelect) {
                marker.setIcon(
                    new Icon({
                        iconUrl: require("@/assets/img/marker-icon-2x-red.png"),
                        shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
                        iconSize: [25, 41],
                        iconAnchor: [12, 41],
                        popupAnchor: [1, -34],
                        shadowSize: [41, 41],
                    })
                );
            }

            _markers.push(marker);
        }

        // Add the locations (when present)
        if (this.locations && this.locations.isSuccess()) {
            for (const location of this.locations.requireData()) {
                // Skip the location when already present inside the tour locations.
                if (this._tourLocations.includes(location)) {
                    continue;
                }

                const latLng = new LatLng(
                    location.latitude,
                    location.longitude
                );

                const marker = new MapMarker(latLng);

                // Create the popup payload.
                const popupPayload = new TourCreatePopupPayload();
                popupPayload.location = location;
                popupPayload.selected = false;
                popupPayload.action = (location) =>
                    this._tourLocations.push(location);
                marker.setPopupPayload(popupPayload);

                _markers.push(marker);
            }
        }

        return _markers;
    }

    /**
     * Get a list with lines, based on the list with tour locations.
     */
    get lines(): Array<MapLine> {
        const _lines = new Array<MapLine>();

        for (let i = 0; i < this._tourLocations.length - 1; i++) {
            const locationStart = this._tourLocations[i];
            const locationEnd = this._tourLocations[i + 1];

            const startCoord = new LatLng(
                locationStart.latitude,
                locationStart.longitude
            );
            const endCoord = new LatLng(
                locationEnd.latitude,
                locationEnd.longitude
            );

            const line = new MapLine([startCoord, endCoord]);
            line.color = this.showSelect ? "#c0392b" : "#2980b9";

            _lines.push(line);
        }

        return _lines;
    }
}
</script>
