<template>
    <!-- Map -->
    <marker-map
        :height="height"
        :width="width"
        :zoom="zoom"
        :center="center"
        :center-by-ip="centerByIp"
        :center-by-geo="centerByGeo"
        :markers="[marker]"
        :searchEnabled="true"
        @mapClick="onMapClick"
        @searchClick="onSearchClick"
    />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { LatLng, LeafletMouseEvent, Map } from "leaflet";
import { MapMarker } from "@/types/map/MapMarker";
import MarkerMap from "@/components/map/MarkerMap.vue";

@Component({
    components: {
        MarkerMap,
    },
})
export default class LocationSetMap extends Vue {
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
     * Marker to display on the map.
     */
    @Prop()
    marker: MapMarker;

    /**
     * If the map is disabled.
     */
    @Prop({ default: false })
    disabled: boolean;

    /**
     * When the user clicks on the map:
     * Update the selected marker on the map.
     * @param event Map click event.
     * @param map Map object.
     */
    onMapClick(event: LeafletMouseEvent, map: Map): void {
        if (this.disabled) {
            return;
        }

        // Update the marker.
        this.marker.setLatLng(event.latlng);

        this.$emit("update:marker", this.marker);
    }

    /**
     * When the user clicks on a search result.
     * Update the selected marker on the map.
     * @param result Search result of a search provider.
     * @param map Map object.
     */
    onSearchClick(result: any, map: Map) {
        if (this.disabled) {
            return;
        }

        const latLng = new LatLng(result.y, result.x);

        // Update the marker.
        this.marker.setLatLng(latLng);

        this.$emit("update:marker", this.marker);

        // Go to the marker location.
        map.flyTo(latLng, 15);
    }
}
</script>
