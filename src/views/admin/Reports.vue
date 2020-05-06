<template>
    <v-container class="container--small">
        <div class="section__title">All Reports</div>
        <!-- Loading -->
        <template v-if="reports.isLoading()">
            <v-skeleton-loader type="table" dense />
        </template>

        <!-- Data -->
        <template v-else-if="reports.isSuccess()">
            <v-data-table :headers="headers" :items="reports.data">
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
        </template>

        <!-- Error -->
        <template v-else-if="reports.isError()">
            <error-placeholder error-id="reports" />
        </template>
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
import Report from "@/api/models/Report.ts";

@Component
export default class Home extends Vue {
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
}
</script>
