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
import { fetchQuery } from "../util/fetchutil";
import { getLocation } from "../data/location";
import LocationHeader from "@/components/layout/views/location/LocationHeader.vue";
import LocationInformation from "@/components/layout/views/location/LocationInformation.vue";
import LocationRatings from "@/components/layout/views/location/LocationRatings.vue";
import Query from "@/data/struct/Query";
import Location from "@/data/models/Location";

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

    location: Query<Location>;
    tab: any;

    constructor() {
        super();

        this.location = fetchQuery(getLocation(this.secretId), {
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

        this.tab = null;
    }
}
</script>
