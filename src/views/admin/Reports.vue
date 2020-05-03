<template>
    <v-container class="container--small">
        <!-- Loading -->
        <template v-if="reports.isLoading()">
            <v-skeleton-loader type="table" dense />
        </template>

        <!-- Data -->
        <template v-else-if="reports.isSuccess()">
            <table style="width:100%">
                <tr>
                    <th>Location</th>
                    <th>Creator</th>
                    <th>Date</th>
                    <th>go</th>
                </tr>
                <tr v-for="(report, index) in reports.data" :key="index">
                    <td>{{ report.location.name }}</td>
                    <td>{{ report.creator.username }}</td>
                    <td>{{ report.creator.createdAt }}</td>
                    <td><v-btn @click="openReport(report.id)">-></v-btn></td>
                </tr>
            </table>

            <!-- <v-data-table
                :headers="headers"
                :items="reports"
                >
             </v-data-table>
             -->
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

@Component({
    components: {
        AdminNavigation
    }
})
export default class Home extends Vue {
    reports = RequestHandler.handle(AdminService.getAll(), {
        id: "admin",
        style: "SNACKBAR"
    });

    headers = [
        {
            text: "Location",
            value: "location.name"
        },
        {
            text: "Creator",
            value: "creator.username"
        },
        {
            text: "Created at",
            value: "creator.createdAt"
        }
    ];

    openReport(reportid: string) {
        this.$store.dispatch("modal/open", {
            component: () => import("@/components/modal/admin/ReportModal.vue"),
            componentPayload: {
                reportId: reportid
            }
        });
    }
}
</script>
