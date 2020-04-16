<template>
    <v-container class="container--small">
        <!-- Setup: when location is not active. -->
        <template v-if="location.isSuccess() && !location.data.active && false">
            <setup :location="location.data" />
        </template>

        <template v-else>
            <!-- General information -->
            <v-row>
                <v-col cols="12">
                    <location-header :location="location" :creator="creator" />
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

                        <v-tab href="#tab-nearby">
                            Nearby locations
                            <v-icon>mdi-map-marker-circle</v-icon>
                        </v-tab>

                        <template
                            v-if="visits.isSuccess() && visits.data.length > 0"
                        >
                            <v-tab
                                href="#tab-guestbook"
                                style="
                                    background-color: rgba(255, 152, 0, 0.4);
                                    border-radius: 5px;
                                "
                            >
                                Guestbook

                                <v-icon>mdi-book-account</v-icon>
                            </v-tab>
                        </template>
                    </v-tabs>

                    <v-row>
                        <v-col cols="12">
                            <v-tabs-items v-model="tab" touchless>
                                <!-- Information -->
                                <v-tab-item value="tab-information">
                                    <location-information
                                        :creator="creator"
                                        :location="location"
                                    />
                                </v-tab-item>

                                <!-- Ratings -->
                                <v-tab-item value="tab-ratings">
                                    <location-ratings :secret-id="secretId" />
                                </v-tab-item>

                                <!-- Nearby -->
                                <v-tab-item value="tab-nearby"> </v-tab-item>

                                <!-- Guestbook -->
                                <v-tab-item value="tab-guestbook">
                                    <location-guestbook :secret-id="secretId" />
                                </v-tab-item>
                            </v-tabs-items>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </template>
    </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { RequestHandler } from "@/api/RequestHandler";
import LocationService from "@/api/services/LocationService";
import LocationHeader from "@/components/view/location/LocationHeader.vue";
import LocationInformation from "@/components/view/location/LocationInformation.vue";
import LocationRatings from "@/components/view/location/LocationRatings.vue";
import Setup from "@/components/view/locations/setup/Setup.vue";
import UserService from "@/api/services/UserService";
import LocationGuestbook from "@/components/view/location/LocationGuestbook.vue";
import { LateRequest } from "@/api/decorators/LateRequestDecorator";
import UsersService from "@/api/services/UsersService";
import { EchoPromise } from "echofetch";
import User from "@/api/models/User";
import { StoreGetter } from "@/store/decorators/StoreGetterDecorator";

@Component({
    components: {
        LocationGuestbook,
        Setup,
        LocationHeader,
        LocationInformation,
        LocationRatings,
    },
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
                    "This location does not exist or was removed by the original creator or an administrator. Sorry for the inconvenience.",
            },
        ],
    });

    /**
     * Creator for the given location.
     */
    @LateRequest("location", "creator.id", UsersService.get, {
        id: "locationCreator",
        style: "NONE",
    })
    creator: EchoPromise<User>;

    /**
     * List with visits of the user for this location.
     */
    visits = RequestHandler.handle(
        UserService.getVisitsByLocation(this.secretId),
        {
            id: "locationVisits",
            style: "NONE",
        }
    );

    /**
     * Object for storing the current opened tab.
     */
    tab: any = null;
}
</script>
