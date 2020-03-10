<template>
    <l-map :zoom="zoom" :center="center" @click="updateMarker">
        <l-tile-layer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <l-marker v-if="marker != null" :lat-lng="marker" />
    </l-map>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import { LatLng } from "leaflet";

@Component({
    components: {
        LMap,
        LTileLayer,
        LMarker
    }
})
export default class SetLocationMap extends Vue {
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
     * @param event Leaflet click event.
     */
    updateMarker(event: any): void {
        this.$emit("update:marker", event.latlng);
    }
}
</script>
