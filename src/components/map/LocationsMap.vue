<template>
    <div>
        <!-- Loading -->
        <template v-if="locationsQuery.loading">
            <v-skeleton-loader dense type="image" />
        </template>

        <!-- Data -->
        <template v-else-if="locationsQuery.data">
            <l-map :zoom="zoom" :center="center">
                <l-tile-layer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <l-marker
                    v-for="(location, index) of locationsQuery.data"
                    :key="index"
                    :lat-lng="getLocationLatLng(location)"
                />
            </l-map>
        </template>

        <!-- Error -->
        <template v-else>
            <error-handler id="locations" />
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import { latLng, LatLng } from "leaflet";
import Config from "@/config";
import Query from "@/data/struct/Query";
import Location from "@/data/models/Location";
import ErrorHandler from "@/components/error/ErrorHandler.vue";

@Component({
    components: {
        LMap,
        LTileLayer,
        LMarker,
        ErrorHandler
    }
})
export default class LocationsMap extends Vue {
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
     * Value to display inside the editor.
     */
    @Prop()
    value: LatLng;

    /**
     * URL of the tile provider server.
     */
    tileServer: string;

    constructor() {
        super();

        this.tileServer = Config.LEAFLET.TILE_SERVER;
    }

    /**
     * Get the latitude and longitude of a locations object.
     *
     * @param location Location object
     */
    getLocationLatLng(location: Location): LatLng {
        return latLng(location.latitude, location.longitude);
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
        }

        return query;
    }
}
</script>
