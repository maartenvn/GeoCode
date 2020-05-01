<template>
    <v-container class="container--small">
        <!-- Header -->
        <div class="section">
            <v-row
                class="section__title"
                no-gutters
                justify="space-between"
                align="center"
            >
                <v-col>Tours</v-col>

                <v-col cols="auto">
                    <v-btn
                        v-if="isAuthenticated"
                        color="primary"
                        depressed
                        @click="openCreate"
                    >
                        Create new tour

                        <v-icon right>
                            mdi-plus-circle-outline
                        </v-icon>
                    </v-btn>
                </v-col>
            </v-row>

            <div class="section__description">
                GeoCode contains user defined locations in various countries and
                cities in the world. Use the map below to find a location near
                any place you want to visit. You can type a location in the
                searchbar below.
            </div>
        </div>

        <!-- Table -->
        <tours-table :tours="tours" />
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { StoreGetter } from "@/store/decorators/StoreGetterDecorator";
import { RequestHandler } from "@/api/RequestHandler";
import TourService from "@/api/services/TourService";
import ToursTable from "@/components/view/tours/ToursTable.vue";

@Component({
    components: { ToursTable },
})
export default class Tours extends Vue {
    /**
     * Get a list with available tours
     */
    tours = RequestHandler.handle(TourService.getAll(), {
        id: "tours",
        style: "SECTION",
        displayFullpage: false,
    });

    /**
     * If the client is logged in.
     */
    @StoreGetter("session/isAuthenticated")
    isAuthenticated: boolean;

    /**
     * Open a modal to create a new tour.
     */
    openCreate() {
        this.$store.dispatch("modal/open", {
            component: () =>
                import("@/components/modal/tour/TourCreateModal.vue"),
            fullscreen: true,
        });
    }
}
</script>
