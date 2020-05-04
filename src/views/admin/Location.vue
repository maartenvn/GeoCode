<template>
    <v-container class="container--small">
        <p>Reports for {{ location.data.name }}</p>
        <!-- Loading -->
        <template v-if="reports.isLoading()">
            <v-skeleton-loader type="table" dense />
        </template>

        <!-- Data -->
        <template v-else-if="reports.isSuccess()">
            <v-data-table :headers="headers" :items="reports.data">
                <template v-slot:item.action="{ item }">
                    <v-btn @click="openReport(item)" color="primary" text>
                        Show details
                        <v-icon right>mdi-arrow-right</v-icon>
                    </v-btn>
                </template>
            </v-data-table>
        </template>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { StoreGetter } from "@/store/decorators/StoreGetterDecorator";
import AdminService from "@/api/services/AdminService";
import LocationService from "@/api/services/LocationService";
import { HandleRequest } from "@/api/decorators/HandleRequestDecorator";
import { EchoPromise } from "echofetch";
import { RequestHandler } from "@/api/RequestHandler";
import Report from "@/api/models/Report.ts";

@Component
export default class LocationReports extends Vue {
    /**
     * Secret ID of the location.
     * Should be passed by Vue Router.
     */
    @Prop()
    secretId: string;

    location = RequestHandler.handle(LocationService.get(this.secretId), {
        id: "location",
        style: "SECTION",
        displayFullpage: true,
    });

    reports = RequestHandler.handle(
        AdminService.getLocationReports(this.secretId),
        {
            id: "locationReports",
            style: "SECTION",
            displayFullpage: true,
        }
    );

    openReport(report: Report) {
        this.$store.dispatch("modal/open", {
            component: () => import("@/components/modal/admin/ReportModal.vue"),
            componentPayload: {
                report,
            },
        });
    }

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
