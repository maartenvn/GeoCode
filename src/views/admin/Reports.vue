<template>
    <v-container class="container--small">
        <!-- Loading -->
        <template v-if="reports.isLoading()">
            <v-skeleton-loader type="table" dense />
        </template>

        <!-- Data -->
        <template v-else-if="reports.isSuccess()">
            <v-card flat>
                <v-card-title>
                    All Reports
                    <v-spacer></v-spacer>
                    <v-text-field
                        v-model="tableSearch"
                        append-icon="mdi-magnify"
                        label="Search"
                        single-line
                        hide-details
                    ></v-text-field>
                </v-card-title>
                <v-data-table
                    :headers="headers"
                    :items="reports.data"
                    sort-by="createdAt"
                    sort-desc
                    :search="tableSearch"
                >
                    <template v-slot:item.createdAt="{ item }">
                        {{ createdAtFormat(item.createdAt) }}
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

        <!-- Error -->
        <template v-else-if="reports.isError()">
            <error-placeholder error-id="reports" />
        </template>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AdminService from "@/api/services/AdminService";
import { RequestHandler } from "@/api/RequestHandler";
import ErrorPlaceholder from "@/components/error/ErrorPlaceholder.vue";

@Component
export default class Home extends Vue {
    tableSearch = "";

    reports = RequestHandler.handle(AdminService.getAll(), {
        id: "admin",
        style: "SECTION",
        displayFullpage: true,
    });

    headers = [
        {
            text: "Location",
            value: "location.name",
        },
        {
            text: "Creator",
            value: "creator.username",
        },
        {
            text: "Created at",
            value: "createdAt",
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
