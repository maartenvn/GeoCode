<template>
    <v-container class="container--small">
        <!-- If the user is the owner of the tour & the tour is deactivated -->

        <!-- General information -->
        <v-row>
            <v-col cols="12">
                <tour-header
                    :tour="tour"
                    :statistics="statistics"
                    :creator="creator"
                    :is-owner="isOwner"
                />
            </v-col>
        </v-row>

        <v-divider class="mt-3 mb-3" />

        <!-- Detailed information -->
        <tour-information :creator="creator" :tour="tour" :is-owner="isOwner" />
    </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { EchoPromise } from "echofetch";
import { RequestHandler } from "@/api/RequestHandler";
import { StoreGetter } from "@/store/decorators/StoreGetterDecorator";
import { LateRequest } from "@/api/decorators/LateRequestDecorator";
import TourService from "@/api/services/TourService";
import UsersService from "@/api/services/UsersService";
import User from "@/api/models/User";
import TourHeader from "@/components/view/tour/TourHeader.vue";
import TourInformation from "@/components/view/tour/TourInformation.vue";

@Component({
    components: { TourInformation, TourHeader },
})
export default class Tour extends Vue {
    /**
     * Secret ID of the location.
     * Should be passed by Vue Router.
     */
    @Prop()
    secretId: string;

    /**
     * Tour based on the given secretId.
     */
    tour = RequestHandler.handle(TourService.get(this.secretId), {
        id: "location",
        style: "SECTION",
        displayFullpage: true,
        customMessages: [
            {
                code: "400",
                message: "Tour does not exist.",
                description:
                    "This tour does not exist or was removed by the original creator or an administrator. Sorry for the inconvenience.",
            },
        ],
    });

    /**
     * Statistics for the given location.
     */
    statistics = RequestHandler.handle(
        TourService.getStatistics(this.secretId),
        {
            id: "tourStatistics",
            style: "SECTION",
        }
    );

    /**
     * Creator for the given tour.
     */
    @LateRequest("tour", "creator.id", UsersService.get, {
        id: "tourCreator",
        style: "NONE",
    })
    creator: EchoPromise<User>;

    /**
     * Current logged in user.
     */
    @StoreGetter("session/currentUser")
    currentUser: EchoPromise<User>;

    /**
     * Get if the current user is the owner of the tour.
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
}
</script>
