<template>
    <div>
        <!-- Search bar -->
        <v-autocomplete
            v-if="searchEnabled"
            v-model="searchSelected"
            :search-input.sync="searchValue"
            :items="searchEntries"
            :loading="searchLoading"
            return-object
            prepend-icon="mdi-database-marker"
            label="Search for a place on the map"
            outlined
            dense
        />

        <!-- Map -->
        <l-map
            ref="map"
            :zoom="zoom"
            :center="center"
            @click="updateMarker"
            :style="`height: ${height}; width: ${width}; z-index: 1;`"
        >
            <l-tile-layer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <!-- Marker -->
            <l-marker v-if="marker != null" :lat-lng="marker" />
        </l-map>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { LatLng, Map } from "leaflet";

@Component({
    components: {
        LMap,
        LTileLayer,
        LMarker
    }
})
export default class SetLocationMap extends Vue {
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
     * Marker to display on the map.
     */
    @Prop()
    marker: LatLng;

    /**
     * Should the map contain a searchbar to search for geolocations.
     */
    @Prop({ default: false })
    searchEnabled: boolean;

    /**
     * Value of the search operator.
     */
    searchValue: string | null;

    /**
     * Entries of the search bar.
     */
    searchEntries: Array<any>;

    /**
     * If the search query is currently loading.
     */
    searchLoading: boolean;

    /**
     * Selected object from the search list.
     */
    searchSelected: any;

    /**
     * Search provider for the results of a search query;
     */
    searchProvider: any;

    constructor() {
        super();

        this.searchValue = null;
        this.searchEntries = [];
        this.searchLoading = false;
        this.searchSelected = null;
        this.searchProvider = new OpenStreetMapProvider();
    }

    /**
     * @param event Leaflet click event.
     */
    updateMarker(event: any): void {
        this.$emit("update:marker", event.latlng);
    }

    /**
     * Update the search entries list when a new search query is entered.
     */
    @Watch("searchValue")
    updateSearch(val: string) {
        // Set the searchbar is currently loading.
        this.searchLoading = true;

        this.searchProvider
            .search({ query: val })
            .then((results: Array<any>) => {
                // Map the results on an object that can be displayed in the autocomplete component.
                this.searchEntries = results.map((result: any) => {
                    return {
                        text: result.label,
                        value: result
                    };
                });

                // Set the searchbar is done loading.
                this.searchLoading = false;
            });
    }

    /**
     * Update the selected marker on the map when
     */
    @Watch("searchSelected")
    updateSelected(val: any) {
        if (val !== undefined) {
            const latlng = new LatLng(val.value.y, val.value.x);

            this.$emit("update:marker", latlng);

            // Go to the marker location.
            (this.$refs.map as any).mapObject.panTo(latlng);
        }
    }
}
</script>
