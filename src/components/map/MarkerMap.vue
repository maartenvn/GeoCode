<template>
    <div>
        <v-row no-gutters justify="end" align-items="center">
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

            <!-- Use current location -->
            <v-col cols="auto">
                <v-btn
                    v-if="centerByGeo"
                    class="ml-3"
                    color="primary"
                    text
                    @click="handleCenterByGeo"
                >
                    Use current location
                </v-btn>
            </v-col>
        </v-row>

        <!-- Map -->
        <l-map
            ref="map"
            id="map"
            :zoom="zoom"
            :center="_center"
            :options="mapOptions"
            :style="`height: ${height}; width: ${width}; z-index: 1; margin: auto;`"
            gestureHandling
            @click="handleMapClick"
        >
            <l-tile-layer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <l-control-attribution
                position="bottomleft"
                prefix="&copy; <a href='https://openstreetmap.org/copyright'>OpenStreetMap contributors</a>"
            />

            <!-- Marker -->
            <l-marker
                v-for="(marker, index) of markers"
                :key="`${index}-marker`"
                :lat-lng="marker.getLatLng()"
                :icon="marker.getIcon()"
            >
                <l-popup v-if="popupComponent !== undefined">
                    <component
                        :is="popupComponent"
                        :payload="marker.getPopupPayload()"
                        :map="map"
                    />
                </l-popup>
            </l-marker>

            <!-- Lines -->
            <l-polyline
                v-for="(line, index) of lines"
                :key="`${index}-line`"
                :lat-lngs="line.getLatLngTuples()"
                :color="line.color"
            />
        </l-map>
    </div>
</template>

<script lang="ts">
import {
    Component,
    Emit,
    Prop,
    PropSync,
    Vue,
    Watch,
} from "vue-property-decorator";
import {
    LMap,
    LMarker,
    LPopup,
    LTileLayer,
    LControlAttribution,
    LPolyline,
} from "vue2-leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import {
    LatLng,
    LatLngTuple,
    LeafletMouseEvent,
    Map,
    MapOptions,
} from "leaflet";
import { MapMarker } from "@/types/map/MapMarker";
import { MapLine } from "@/types/map/MapLine";
import CurrentLocationService from "@/api/services/CurrentLocationService";
import ErrorModal from "@/components/modal/ErrorModal.vue";

@Component({
    components: {
        LMap,
        LTileLayer,
        LMarker,
        LPopup,
        LPolyline,
        LControlAttribution,
    },
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
    @PropSync("center")
    _center: Array<number>;

    /**
     * Should the users IP-address be used as center for the map.
     * @var center will be used as initial center & fallback.
     */
    @Prop({ default: false })
    centerByIp: boolean;

    /**
     * Should the users geolocation be used as center for the map.
     * This will add a button allowing the user to center the map using its location.
     * @var center will be used as initial center & fallback.
     */
    @Prop({ default: false })
    centerByGeo: boolean;

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
     * Lines to display on the map.
     */
    @Prop({ default: () => [] })
    lines: Array<MapLine>;

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
    map: Map | null = null;

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
            gestureHandling: true,
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

        const searchValueCopy = this.searchValue;

        this.searchProvider
            .search({ query: val })
            .then((results: Array<any>) => {
                // Only update the search entries when the current text in the searchfield equals the original request.
                if (this.searchValue === searchValueCopy) {
                    // Map the results on an object that can be displayed in the autocomplete component.
                    this.searchEntries = results.map((result: any) => {
                        return {
                            text: result.label,
                            value: result,
                        };
                    });

                    // Set the searchbar is done loading.
                    this.searchLoading = false;
                }
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

    /**
     * Use the users IP address for determining the center.
     */
    @Watch("centerByIp", { immediate: true })
    handleCenterByIp() {
        if (this.centerByIp) {
            CurrentLocationService.getCurrentLocation()
                .then((data) => {
                    // Update the center.
                    this._center = [data.latitude, data.longitude];

                    // Go to the new center on the map.
                    this.map?.panTo(new LatLng(data.latitude, data.longitude));
                })
                .catch(() => void 0);
        }
    }

    /**
     * Use the users GeoLocation for determining the center.
     */
    handleCenterByGeo() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // Update the center.
                    this._center = [
                        position.coords.latitude,
                        position.coords.longitude,
                    ];

                    // Update the center on the map.
                    // Go to the new center on the map.
                    this.map?.flyTo(
                        new LatLng(
                            position.coords.latitude,
                            position.coords.longitude
                        ),
                        10
                    );
                },
                (error) => {
                    this.$store.dispatch("snackbar/open", {
                        message: error.message,
                        color: "error",
                    });
                },
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0,
                }
            );
        } else {
            this.$store.dispatch("modal/open", {
                component: ErrorModal,
                componentPayload: {
                    title: "Unable to get location",
                    message:
                        "You are using a very old browser. We are unable to get your location. Please update your browser!",
                },
            });
        }
    }
}
</script>
