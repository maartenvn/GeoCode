<template>
    <v-container class="container--small">
        <!-- Statistic -->
        <div class="section">
            <!-- Loading -->
            <v-row v-if="currentUser.isLoading()">
                <statistics-card :loading="true" />
                <statistics-card :loading="true" />
                <statistics-card :loading="true" />
            </v-row>

            <!-- Data -->
            <v-row v-else-if="currentUser.isSuccess()">
                <statistics-card value="10" title="Visited Locations" />
                <statistics-card value="1" title="Different countries" />
                <statistics-card value="19" title="Scans" />
            </v-row>
        </div>

        <!-- Visits -->
        <div class="section">
            <div class="section__title">
                Your visits
            </div>

            <div class="section__description">
                Overview of all the locations you have visited.
            </div>

            <!-- Loading -->
            <template v-if="currentUser.isLoading()">
                <v-skeleton-loader type="table" dense />
            </template>

            <!-- Data -->
            <template v-else-if="currentUser.isSuccess()">
                <visits-table :visits="visits" />
            </template>
        </div>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { StoreGetter } from "@/store/decorators/StoreGetterDecorator";
import { EchoPromise } from "echofetch";
import User from "@/api/models/User";
import StatisticsCard from "@/components/statistics/StatisticsCard.vue";
import UserService from "@/api/services/UserService";
import LocationsTable from "@/components/view/locations/LocationsTable.vue";
import VisitsTable from "@/components/view/profile/visits/VisitsTable.vue";

@Component({
    components: { VisitsTable, LocationsTable, StatisticsCard }
})
export default class ProfileVisits extends Vue {
    /**
     * List of visits for the logged in user.
     */
    visits = UserService.getVisits();

    /**
     * Logged in user.
     */
    @StoreGetter("session/currentUser")
    currentUser: EchoPromise<User>;
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
