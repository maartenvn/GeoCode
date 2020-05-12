<template>
    <v-container class="container--small">
        <!-- Loading -->
        <template v-if="reportedLocations.isLoading()">
            <v-skeleton-loader type="table" dense />
        </template>

        <!-- Data -->
        <template v-else-if="reportedLocations.isSuccess()">
            <v-card flat>
                <v-card-title>
                    Reported Locations
                </v-card-title>

                <v-data-table
                    :headers="headers"
                    :items="reportedLocations.data"
                    sort-by="reportsCount"
                    sort-desc
                    :search="tableSearch"
                >
                    <template v-slot:top>
                        <v-text-field
                            v-model="tableSearch"
                            prepend-icon="mdi-database-search"
                            label="Search for a reported location"
                            single-line
                            outlined
                            dense
                        />
                    </template>

                    <template v-slot:item.action="{ item }">
                        <v-btn
                            :to="`/admin/reports/${item.location.secretId}`"
                            color="primary"
                            text
                        >
                            Show reports
                            <v-icon right>mdi-arrow-right</v-icon>
                        </v-btn>
                    </template>
                </v-data-table>
            </v-card>
        </template>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AdminService from "@/api/services/AdminService";
import { RequestHandler } from "@/api/RequestHandler";
import ReportService from "../../api/services/ReportService";

@Component
export default class Home extends Vue {
    tableSearch = "";

    reportedLocations = RequestHandler.handle(
        ReportService.getReportedLocations(),
        {
            id: "reports",
            style: "SECTION",
            displayFullpage: true,
        }
    );

    headers = [
        {
            text: "Location",
            value: "location.name",
        },
        {
            text: "# of Reports",
            value: "reportsCount",
        },
        {
            text: "",
            value: "action",
            sortable: false,
            align: "end",
        },
    ];

    /**
     * Get the createdAt as a string.
     */
    createdAtFormat(dateString: string): string {
        const date = new Date(dateString);

        return date.toLocaleString();
    }
}
</script>
