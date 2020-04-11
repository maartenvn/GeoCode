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
            :options="mapOptions"
            :style="
                `height: ${height}; width: ${width}; z-index: 1; margin: auto;`
            "
            gestureHandling
            @click="handleMapClick"
        >
            <l-tile-layer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <!-- Marker -->
            <l-marker
                v-for="(marker, index) of markers"
                :key="index"
                :lat-lng="marker.getLatLng()"
            >
                <l-popup v-if="popupComponent !== undefined">
                    <component
                        :is="popupComponent"
                        :payload="marker.getPopupPayload()"
                    />
                </l-popup>
            </l-marker>
        </l-map>
    </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";
import { LMap, LMarker, LPopup, LTileLayer } from "vue2-leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { LeafletMouseEvent, Map, MapOptions } from "leaflet";
import { MapMarker } from "@/types/map/MapMarker";

@Component({
    components: {
        LMap,
        LTileLayer,
        LMarker,
        LPopup
    }
})
export default class MarkerMap extends Vue {
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
     * Markers to display on the map.
     */
    @Prop({ default: () => [] })
    markers: Array<MapMarker>;

    /**
     * Popup component to display inside the popup.
     */
    @Prop()
    popupComponent: unknown;

    /**
     * Action to execute when clicked on the map.
     */
    @Prop({ default: () => void 0 })
    mapClick: Function;

    /**
     * Action to execute when clicked on a search result.
     */
    @Prop({ default: () => void 0 })
    searchClick: Function;

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

    /**
     * Map object.
     */
    map: Map;

    /**
     * Map options
     */
    mapOptions: MapOptions & { gestureHandling: boolean };

    constructor() {
        super();

        this.searchValue = null;
        this.searchEntries = [];
        this.searchLoading = false;
        this.searchSelected = null;
        this.searchProvider = new OpenStreetMapProvider();
        this.mapOptions = {
            zoomSnap: 0.5,
            gestureHandling: true
        };
    }

    mounted() {
        this.map = (this.$refs.map as any).mapObject;
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
     * Handle when clicked on a search result.
     */
    @Watch("searchSelected")
    handleSearch(val: any) {
        this.$emit("searchClick", val.value, this.map);
    }

    /**
     * Handle click on the map.
     */
    @Emit("mapClick")
    handleMapClick(event: LeafletMouseEvent) {
        this.$emit("mapClick", event, this.map);
    }
}
</script>
