<template>
    <div class="section" style="height: 100%; width: 100%;">
        <div class="section__title">
            Nearby locations
        </div>

        <!-- Loading -->
        <template v-if="isLoading">
            <v-skeleton-loader dense type="image" />
        </template>

        <!-- Data -->
        <template v-else-if="isSuccess">
            <marker-map
                class="ma-auto"
                :height="height"
                :width="width"
                :zoom="zoom"
                :center="center"
                :markers="markers"
                :popupComponent="popupComponent"
                :searchEnabled="searchEnabled"
                @searchClick="onSearchClick"
            />
        </template>

        <!-- Error -->
        <template v-else>
            <error-placeholder error-id="locations" />
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { LatLng, Map } from "leaflet";
import { EchoPromise } from "echofetch";
import { MapMarker } from "@/types/map/MapMarker";
import { LocationPopupPayload } from "@/types/map/location/LocationPopup";
import Location from "@/api/models/Location";
import MarkerMap from "@/components/map/MarkerMap.vue";
import LocationPopup from "@/components/map/popup/LocationPopup.vue";
import ErrorPlaceholder from "@/components/error/ErrorPlaceholder.vue";

@Component({
    components: {
        MarkerMap,
        ErrorPlaceholder,
    },
})
export default class LocationMap extends Vue {
    /**
     * Single location to display on the map
     */
    @Prop()
    location: EchoPromise<Location>;

    /**
     * List with locations to display on the map.
     */
    @Prop()
    locations: EchoPromise<Array<Location>>;

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

    @Prop({ default: false })
    searchEnabled: boolean;

    /**
     * Component to display inside the popup of a marker.
     */
    popupComponent: unknown;

    constructor() {
        super();

        this.popupComponent = LocationPopup;
    }

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
     * Get a list with markers, based on the list with locations.
     */
    get markers(): Array<MapMarker> {
        const data = this.getLocations().map(
            (location: Location): MapMarker => {
                const latLng = new LatLng(
                    location.latitude,
                    location.longitude
                );

                const marker = new MapMarker(latLng);
                marker.setPopupPayload(new LocationPopupPayload(location));

                return marker;
            }
        );

        return data;
    }

    /**
     * Get if any of the "locations" or "location" requests are loading.
     */
    get isLoading(): boolean {
        if (this.locations && this.locations.isLoading()) {
            return true;
        }

        if (this.location && this.location.isLoading()) {
            return true;
        }

        return false;
    }

    /**
     * Get if both "locations" or "location" succeeded.
     */
    get isSuccess(): boolean {
        return (
            !this.locations ||
            this.locations.isSuccess() ||
            !this.location ||
            this.location.isSuccess()
        );
    }

    /**
     * Merge the "locations" together with "location".
     */
    private getLocations(): Array<Location> {
        const locations: Array<Location> = [];

        // Add the "location" prop.
        if (this.location && this.location.isSuccess()) {
            locations.push(this.location.requireData());
        }

        // Add the "locations" prop.
        if (this.locations && this.locations.isSuccess()) {
            locations.push(...this.locations.requireData());
        }

        return locations;
    }
}
</script>
