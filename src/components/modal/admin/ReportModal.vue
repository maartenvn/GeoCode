<template>
    <v-card>
        <!-- Loading -->
        <template v-if="report.isLoading()">
            <v-card-title>
                <v-skeleton-loader type="heading" dense />
            </v-card-title>

            <v-card-text>
                <v-skeleton-loader type="list-item" dense />
            </v-card-text>

            <v-card-actions>
                <v-spacer />
            </v-card-actions>
        </template>

        <!-- Data -->
        <template v-else-if="report.isSuccess()">
            <v-card-title>
                Report for {{ report.location.name }}

                <v-spacer />

                <v-btn icon @click="close">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>

            <v-card-text>
                {{ report.id }}
            </v-card-text>

            <v-card-actions>
                <v-spacer />
            </v-card-actions>
        </template>

        <!-- Error -->
        <template v-else-if="reports.isError()">
            <error-placeholder error-id="report" />
        </template>
    </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import AdminService from "@/api/services/AdminService";
import { RequestHandler } from "@/api/RequestHandler";

@Component
export default class ReportModal extends Vue {
    /**
     * Payload, passed when opening the modal.
     */
    @Prop()
    payload: { reportId: string };

    report = RequestHandler.handle(
        AdminService.getReport(this.payload.reportId),
        {
            id: "report",
            style: "SNACKBAR"
        }
    );

    /**
     * Close the modal.
     */
    close() {
        this.$store.dispatch("modal/close");
    }
}
</script>
