<template>
    <v-container class="container--small">
        <!-- Location is inactive -->
        <template v-if="location.isSuccess() && !location.data.active">
            <!-- Setup -->
            <template v-if="isOwner">
                <setup :location="location.data" />
            </template>
        </template>

        <template v-else>
            <!-- General information -->
            <v-row>
                <v-col cols="12">
                    <location-header
                        :location="location"
                        :statistics="statistics"
                        :creator="creator"
                    />
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

                        <template v-if="showGuestbook">
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

                        <v-tab href="#tab-ratings">
                            Ratings
                            <v-icon>mdi-star</v-icon>
                        </v-tab>

                        <v-tab href="#tab-nearby">
                            Nearby locations
                            <v-icon>mdi-map-marker-circle</v-icon>
                        </v-tab>
                    </v-tabs>

                    <v-row>
                        <v-col cols="12">
                            <v-tabs-items v-model="tab" touchless>
                                <!-- Information -->
                                <v-tab-item value="tab-information">
                                    <location-information
                                        :creator="creator"
                                        :location="location"
                                        :statistics="statistics"
                                    />
                                </v-tab-item>

                                <!-- Guestbook -->
                                <v-tab-item value="tab-guestbook">
                                    <location-guestbook :secret-id="secretId" />
                                </v-tab-item>

                                <!-- Ratings -->
                                <v-tab-item value="tab-ratings">
                                    <location-ratings :secret-id="secretId" />
                                </v-tab-item>

                                <!-- Nearby -->
                                <v-tab-item value="tab-nearby"> </v-tab-item>
                            </v-tabs-items>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </template>
    </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { RequestHandler } from "@/api/RequestHandler";
import { LateRequest } from "@/api/decorators/LateRequestDecorator";
import { ErrorHandler } from "@/api/error/ErrorHandler";
import { EchoError, EchoPromise } from "echofetch";
import { StoreGetter } from "@/store/decorators/StoreGetterDecorator";
import UsersService from "@/api/services/UsersService";
import UserService from "@/api/services/UserService";
import User from "@/api/models/User";
import ErrorSection from "@/components/error/placeholders/ErrorSection.vue";
import LocationService from "@/api/services/LocationService";
import LocationHeader from "@/components/view/location/LocationHeader.vue";
import LocationInformation from "@/components/view/location/LocationInformation.vue";
import LocationRatings from "@/components/view/location/LocationRatings.vue";
import LocationGuestbook from "@/components/view/location/LocationGuestbook.vue";
import Setup from "@/components/view/locations/setup/Setup.vue";

@Component({
    components: {
        ErrorSection,
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
     * Statistics for the location
     */
    statistics = RequestHandler.handle(
        LocationService.getStatistics(this.secretId),
        {
            id: "locationStatistics",
            style: "SECTION",
            displayFullpage: false,
        }
    );

    /**
     * Creator for the given location.
     */
    @LateRequest("location", "creator.id", UsersService.get, {
        id: "locationCreator",
        style: "NONE",
    })
    creator: EchoPromise<User>;

    /**
     * Current logged in user.
     */
    @StoreGetter("session/currentUser")
    currentUser: EchoPromise<User>;

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

    /**
     * Get if the current user is the owner of the location.
     */
    get isOwner() {
        return (
            this.creator &&
            this.currentUser &&
            this.creator.isSuccess() &&
            this.currentUser.isSuccess() &&
            this.creator.requireData().id === this.currentUser.requireData().id
        );
    }

    /**
     * Should the guestbook be showed to the user.
     */
    get showGuestbook(): boolean {
        // If the user is the owner, show the guestbook.
        if (this.isOwner) {
            return true;
        }

        // Otherwise, the user should have visited the location.
        return this.visits.isSuccess() && this.visits.requireData().length > 0;
    }

    /**
     * Throw an error when the location is inactive.
     */
    @Watch("location", { immediate: true })
    @Watch("creator", { immediate: true })
    @Watch("currentUser", { immediate: true })
    isInactive() {
        if (
            this.location.isSuccess() &&
            !this.location.requireData().active &&
            this.creator.isSuccess()
        ) {
            if (this.isOwner) {
                return;
            }

            const error = {
                code: "location_inactive",
            } as EchoError;

            ErrorHandler.handle(error, {
                id: "locationInactive",
                style: "SECTION",
                displayFullpage: true,
                customMessages: [
                    {
                        code: "location_inactive",
                        message: "Location is currently inactive",
                        description:
                            "The creator has currently deactivated this location. Please try again later.",
                    },
                ],
            });
        }
    }
}
</script>
