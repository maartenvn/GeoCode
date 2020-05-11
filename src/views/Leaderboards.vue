<template>
    <v-container class="container--small">
        <v-tabs v-model="tab" centered icons-and-text show-arrows>
            <v-tabs-slider />

            <v-tab href="#tab-created-locations">
                Most locations created
                <v-icon>mdi-map-marker</v-icon>
            </v-tab>

            <v-tab href="#tab-visited-locations">
                Most locations visited
                <v-icon>mdi-map-marker-check</v-icon>
            </v-tab>

            <v-tab href="#tab-created-tours">
                Most tours created
                <v-icon>mdi-routes</v-icon>
            </v-tab>

            <v-tab href="#tab-visited-tours">
                Most tours visited
                <v-icon>mdi-routes-clock</v-icon>
            </v-tab>

            <v-tab href="#tab-visited-countries">
                Most countries visited
                <v-icon>mdi-earth</v-icon>
            </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab" class="mt-6" touchless>
            <!-- Locations created -->
            <v-tab-item value="tab-created-locations">
                <leaderboards-table
                    :users-function="leaderboardService.getCreatedLocations"
                />
            </v-tab-item>

            <!-- Locations visited -->
            <v-tab-item value="tab-visited-locations">
                <leaderboards-table
                    :users-function="leaderboardService.getVisitedLocations"
                />
            </v-tab-item>

            <!-- Tours created -->
            <v-tab-item value="tab-created-tours">
                <leaderboards-table
                    :users-function="leaderboardService.getCreatedTours"
                />
            </v-tab-item>

            <!-- Tours visited -->
            <v-tab-item value="tab-visited-tours">
                <leaderboards-table
                    :users-function="leaderboardService.getVisitedTours"
                />
            </v-tab-item>

            <!-- Countries visited -->
            <v-tab-item value="tab-visited-countries">
                <leaderboards-table
                    :users-function="leaderboardService.getVisitedCountries"
                />
            </v-tab-item>
        </v-tabs-items>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LeaderboardService from "@/api/services/LeaderboardService";
import LeaderboardsTable from "@/components/view/leaderboards/LeaderboardsTable.vue";

@Component({
    components: { LeaderboardsTable },
})
export default class Leaderboards extends Vue {
    /**
     * Object for storing the current opened tab.
     */
    tab: unknown = null;

    /**
     * Leaderboard service
     */
    leaderboardService = LeaderboardService;
}
</script>
