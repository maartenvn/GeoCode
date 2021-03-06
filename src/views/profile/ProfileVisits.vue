<template>
    <v-container class="container--small">
        <!-- Statistic -->
        <div class="section">
            <!-- Loading -->
            <v-row v-if="statistics.isLoading()">
                <v-col cols="12" sm="6" md="4">
                    <statistics-card :loading="true" />
                </v-col>

                <v-col cols="12" sm="6" md="4">
                    <statistics-card :loading="true" />
                </v-col>

                <v-col cols="12" sm="6" md="4">
                    <statistics-card :loading="true" />
                </v-col>
            </v-row>

            <!-- Data -->
            <v-row v-else-if="statistics.isSuccess()">
                <v-col cols="12" sm="6" md="4">
                    <statistics-card
                        :value="statistics.data.visitedLocationsCount"
                        title="Visited Locations"
                    />
                </v-col>

                <v-col cols="12" sm="6" md="4">
                    <statistics-card
                        :value="statistics.data.visitedCountriesCount"
                        title="Different countries"
                    />
                </v-col>

                <v-col cols="12" sm="6" md="4">
                    <statistics-card
                        :value="statistics.data.visitedCount"
                        title="Scans"
                    />
                </v-col>
            </v-row>

            <!-- Error -->
            <error-placeholder v-else error-id="statistics" />
        </div>

        <!-- Visits -->
        <div class="section">
            <div class="section__title">
                Your visits
            </div>

            <div class="section__description">
                Overview of all the locations you have visited.
            </div>

            <visits-table :visits="visits" />
        </div>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import StatisticsCard from "@/components/statistics/StatisticsCard.vue";
import UserService from "@/api/services/UserService";
import LocationsTable from "@/components/view/locations/LocationsTable.vue";
import VisitsTable from "@/components/view/profile/visits/VisitsTable.vue";
import { RequestHandler } from "@/api/RequestHandler";
import ErrorPlaceholder from "@/components/error/ErrorPlaceholder.vue";

@Component({
    components: {
        ErrorPlaceholder,
        VisitsTable,
        LocationsTable,
        StatisticsCard,
    },
})
export default class ProfileVisits extends Vue {
    /**
     * List of visits for the logged in user.
     */
    visits = RequestHandler.handle(UserService.getVisits(), {
        id: "visits",
        style: "SECTION",
        displayFullpage: true,
    });

    /**
     * Statistics for the logged in user.
     */
    statistics = RequestHandler.handle(UserService.getStatistics(), {
        id: "statistics",
        style: "SECTION",
    });
}
</script>

<style lang="scss">
.statistics {
    &__card {
        height: 200px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        &__stat {
            font-weight: 600;
            font-size: 3.5rem;
        }

        &__title {
            font-size: 1.3rem;
        }
    }
}
</style>
