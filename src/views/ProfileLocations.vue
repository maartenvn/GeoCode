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
import { getCurrentUserLocations } from "@/data/user";
import { fetchQuery } from "@/util/fetchutil";
import Query from "@/data/struct/Query";
import Location from "@/data/models/Location";
import LocationsTable from "@/components/layout/views/locations/LocationsTable.vue";
import LocationCreateModal from "@/components/layout/modals/LocationCreateModal.vue";

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

        this.locations = fetchQuery(getCurrentUserLocations(), {
            style: "SECTION",
            id: "currentUserLocations",
            displayFullpage: true
        });
    }

    /**
     * Open a modal to create a new location.
     */
    openCreateLocation() {
        this.$store.dispatch("modal/open", {
            component: LocationCreateModal,
            fullscreen: true
        });
    }
}
</script>
