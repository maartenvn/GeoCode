<template>
    <v-container class="container--small">
        <div class="section">
            <div class="section__title">
                Your tours

                <v-spacer />

                <v-btn color="primary" depressed @click="openCreateTour">
                    Create new tour
                    <v-icon right>
                        mdi-plus-circle-outline
                    </v-icon>
                </v-btn>
            </div>

            <div class="section__description">
                Overview of all the tours you have created. You can edit your
                tour using the "View"-button
            </div>
        </div>

        <tours-table
            :tours="tours"
            :delete-enabled="true"
            :active-enabled="true"
        />
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { RequestHandler } from "@/api/RequestHandler";
import UserService from "@/api/services/UserService";
import ToursTable from "@/components/view/tours/ToursTable.vue";

@Component({
    components: {
        ToursTable,
    },
})
export default class ProfileTours extends Vue {
    /**
     * List with tours.
     */
    tours = RequestHandler.handle(UserService.getTours(), {
        id: "tours",
        style: "SECTION",
    });

    /**
     * Open a modal to create a new tour.
     */
    openCreateTour() {
        this.$store.dispatch("modal/open", {
            component: () =>
                import("@/components/modal/tour/TourCreateModal.vue"),
            fullscreen: true,
        });
    }
}
</script>
