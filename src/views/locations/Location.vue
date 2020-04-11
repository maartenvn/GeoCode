<template>
    <v-container class="container--small">
        <!-- General information -->
        <v-row>
            <v-col cols="12">
                <location-header :location="location" />
            </v-col>
        </v-row>

        <v-divider class="mt-3 mb-3" />

        <!-- Tab information -->
        <v-row>
            <v-col cols="12">
                <v-tabs v-model="tab" centered icons-and-text show-arrows>
                    <v-tabs-slider />

                    <v-tab href="#tab-information">
                        Information
                        <v-icon>mdi-information</v-icon>
                    </v-tab>

                    <v-tab href="#tab-ratings">
                        Ratings
                        <v-icon>mdi-star</v-icon>
                    </v-tab>

                    <v-tab href="#tab-3">
                        Nearby locations
                        <v-icon>mdi-map-marker-circle</v-icon>
                    </v-tab>
                </v-tabs>

                <v-row>
                    <v-col cols="12">
                        <v-tabs-items v-model="tab" touchless>
                            <v-tab-item value="tab-information">
                                <location-information :location="location" />
                            </v-tab-item>
                            <v-tab-item value="tab-ratings">
                                <location-ratings />
                            </v-tab-item>
                        </v-tabs-items>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import LocationService from "@/api/services/LocationService";
import LocationHeader from "@/components/view/location/LocationHeader.vue";
import LocationInformation from "@/components/view/location/LocationInformation.vue";
import LocationRatings from "@/components/view/location/LocationRatings.vue";
import { RequestHandler } from "@/api/RequestHandler";

@Component({
    components: {
        LocationHeader,
        LocationInformation,
        LocationRatings
    }
})
export default class LocationView extends Vue {
    /**
     * Secret ID of the location.
     * Should be passed by Vue Router.
     */
    @Prop()
    secretId: string;

    /**
     * List with locations
     */
    location = RequestHandler.handle(LocationService.get(this.secretId), {
        id: "location",
        style: "SECTION",
        displayFullpage: true,
        customMessages: [
            {
                code: "400",
                message: "Location does not exist.",
                description:
                    "This location does not exist or was removed by the original creator or an administrator. Sorry for the inconvenience."
            }
        ]
    });

    /**
     * Object for storing the current opened tab.
     */
    tab: any = null;
}
</script>
