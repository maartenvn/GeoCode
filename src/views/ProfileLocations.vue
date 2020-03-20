<template>
    <v-container class="container--small">
        <div class="section">
            <div class="section__title">
                Your locations

                <v-spacer />

                <v-btn color="primary" depressed @click="openCreateLocation">
                    Create new location
                    <v-icon right>
                        mdi-plus-circle-outline
                    </v-icon>
                </v-btn>
            </div>

            <div class="section__description">
                Overview of all the locations you have created. You can edit
                your locations using the "View"-button
            </div>
        </div>

        <locations-table :locations="locations" :deleteEnabled="true" />
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Query from "@/api/struct/Query";
import Location from "@/api/models/Location";
import LocationsTable from "@/components/layout/views/locations/LocationsTable.vue";
import LocationCreateModal from "@/components/modals/LocationCreateModal.vue";
import FetchHandler from "@/api/FetchHandler";
import UserService from "@/api/services/UserService";

@Component({
    components: {
        LocationsTable
    }
})
export default class ProfileLocations extends Vue {
    /**
     * List with locations.
     */
    locations: Query<Array<Location>>;

    constructor() {
        super();

        this.locations = FetchHandler.fetchQuery(
            UserService.getCurrentLocations(),
            {
                style: "SECTION",
                id: "currentUserLocations",
                displayFullpage: true
            }
        );
    }

    /**
     * Open a modal to create a new location.
     */
    openCreateLocation() {
        this.$store.dispatch("modal/open", {
            component: () =>
                import("@/components/modals/LocationCreateModal.vue"),
            fullscreen: true
        });
    }
}
</script>
