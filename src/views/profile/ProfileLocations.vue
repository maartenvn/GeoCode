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

        <locations-table
            :locations="locations"
            :delete-enabled="true"
            :active-enabled="true"
        />
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { RequestHandler } from "@/api/RequestHandler";
import LocationsTable from "@/components/view/locations/LocationsTable.vue";
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
    locations = RequestHandler.handle(UserService.getLocations(), {
        id: "userLocations",
        style: "SECTION",
        displayFullpage: true
    });

    /**
     * Open a modal to create a new location.
     */
    openCreateLocation() {
        this.$store.dispatch("modal/open", {
            component: () =>
                import("@/components/modal/location/LocationCreateModal.vue"),
            fullscreen: true
        });
    }
}
</script>
