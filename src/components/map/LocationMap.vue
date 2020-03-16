<template>
    <div style="height: 100%; width: 100%;">
        <!-- Loading -->
        <template v-if="locationsQuery.loading">
            <v-skeleton-loader dense type="image" />
        </template>

        <!-- Data -->
        <template v-else-if="locationsQuery.data">
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
            <error-handler id="locations" />
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { latLng, LatLng, Map } from "leaflet";
import { MapMarker } from "../../types/mapmarker";
import Config from "@/config";
import Query from "@/data/struct/Query";
import Location from "@/data/models/Location";
import ErrorHandler from "@/components/error/ErrorHandler.vue";
import MarkerMap from "@/components/map/MarkerMap.vue";
import LocationPopup from "@/components/map/popups/LocationPopup.vue";
import { LocationPopupPayload } from "../../types/map/popup/locationpopup";

@Component({
    components: {
        ErrorHandler,
        MarkerMap
    }
})
export default class LocationMap extends Vue {
    /**
     * Single location to display on the map
     */
    @Prop()
    location: Query<Location>;

    /**
     * List with locations to display on the map.
     */
    @Prop()
    locations: Query<Array<Location>>;

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
     * URL of the tile provider server.
     */
    tileServer: string;

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
        if (this.locationsQuery.data) {
            const data = this.locationsQuery.data.map(
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
        } else {
            return [];
        }
    }

    /**
     * Create a new locations query based on the given "location" and "locations" props.
     */
    get locationsQuery(): Query<Array<Location>> {
        let loading = false;
        let data: Array<Location> = [];
        let error;

        // If "locations" is passed.
        if (this.locations) {
            if (this.locations.loading) {
                loading = true;
            }

            if (this.locations.data) {
                data = data.concat(this.locations.data);
            }

            if (this.locations.error) {
                error = this.locations.error;
            }
        }

        // If "location" is passed.
        if (this.location) {
            if (this.location.loading) {
                loading = true;
            }

            if (this.location.data) {
                data = data.concat(this.location.data);
            }

            if (this.location.error) {
                error = this.location.error;
            }
        }

        const query = new Query();
        query.loading = loading;
        query.data = data;

        if (error !== undefined) {
            query.error = error;
            query.data = undefined;
        }

        return query;
    }
}
</script>
