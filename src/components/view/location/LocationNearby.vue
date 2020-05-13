<template>
    <div class="section">
        <div class="section__title">
            Nearby locations
        </div>

        <!-- Loading -->
        <template v-if="location.isLoading()">
            <v-skeleton-loader dense type="image" height="400px" />
        </template>

        <!-- Data -->
        <template v-else-if="location.isSuccess()">
            <location-map
                height="400px"
                width="100%"
                :zoom="10"
                :center="[location.data.latitude, location.data.longitude]"
                :locations="locations"
            />
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import LocationMap from "@/components/map/location/LocationMap.vue";
import Location from "@/api/models/Location";
import { EchoPromise } from "echofetch";
import { RequestHandler } from "@/api/RequestHandler";
import LocationService from "@/api/services/LocationService";

@Component({
    components: { LocationMap },
})
export default class LocationNearby extends Vue {
    /**
     * Location.
     */
    @Prop()
    location: EchoPromise<Location>;

    /**
     * List with locations
     */
    locations = RequestHandler.handle(LocationService.getAll(), {
        id: "locations",
        style: "SECTION",
    });
}
</script>
