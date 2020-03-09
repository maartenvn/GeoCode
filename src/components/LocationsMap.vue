<template>
    <div style="height: 500px; width: 80%">
        <!-- Loading -->
        <template v-if="locations.loading">
            <v-skeleton-loader dense type="image" />
        </template>

        <!-- Data -->
        <template v-else-if="locations.data">
            <l-map :zoom="10" :center="[47.41322, -1.219482]">
                <l-tile-layer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <l-marker
                    v-for="(location, index) of locations.data"
                    :key="index"
                    :lat-lng="getLocationLatLng(location)"
                />
            </l-map>
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import { latLng, LatLng } from "leaflet";
import Config from "@/config";
import Query from "../data/struct/Query";
import Location from "../data/models/Location";

@Component({
    components: {
        LMap,
        LTileLayer,
        LMarker
    }
})
export default class LocationsMap extends Vue {
    /**
     * Get a list with locations to display on the map.
     */
    @Prop()
    locations: Query<Array<Location>>;

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
        return latLng(location.lat, location.long);
    }
}
</script>
