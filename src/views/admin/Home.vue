<template>
    <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
            <v-row v-if="stats.isLoading()">
                <v-col cols="12" sm="6" md="3">
                    <statistics-card :loading="true" />
                </v-col>
                <v-col cols="12" sm="6" md="3">
                    <statistics-card :loading="true" />
                </v-col>
                <v-col cols="12" sm="6" md="3">
                    <statistics-card :loading="true" />
                </v-col>
                <v-col cols="12" sm="6" md="3">
                    <statistics-card :loading="true" />
                </v-col>
            </v-row>

            <!-- Data -->
            <v-row v-else-if="stats.isSuccess()">
                <v-col cols="12" sm="6" md="3">
                    <statistics-card
                        title="VISITS"
                        :value="stats.data.visitsCount"
                    />
                </v-col>
                <v-col cols="12" sm="6" md="3">
                    <statistics-card
                        title="LOCATIONS"
                        :value="stats.data.locationsCount"
                    />
                </v-col>
                <v-col cols="12" sm="6" md="3">
                    <statistics-card
                        title="COUNTRIES"
                        :value="stats.data.countriesCount"
                    />
                </v-col>
                <v-col cols="12" sm="6" md="3">
                    <statistics-card
                        title="USERS"
                        :value="stats.data.usersCount"
                    />
                </v-col>
            </v-row>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { StoreGetter } from "@/store/decorators/StoreGetterDecorator";
import AdminNavigation from "@/components/admin/AdminNavigation.vue";
import AdminService from "@/api/services/AdminService";
import { HandleRequest } from "@/api/decorators/HandleRequestDecorator";
import { EchoPromise } from "echofetch";
import { RequestHandler } from "@/api/RequestHandler";
import StatisticsCard from "@/components/statistics/StatisticsCard.vue";

@Component({
    components: {
        StatisticsCard,
    },
})
export default class Home extends Vue {
    stats = RequestHandler.handle(AdminService.getStats(), {
        id: "adminStats",
        style: "SECTION",
        displayFullpage: true,
    });
}
</script>
