<template>
    <v-card>
        <template>
            <v-card-title>
                Report for {{ payload.report.location.name }}

                <v-spacer />

                <v-btn icon @click="close">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>

            <v-card-text>
                <p>Reason: {{ payload.report.reason }}</p>
                <p>{{ payload.report.message }}</p>
                <img :src="getImageURL(payload.report)" />
            </v-card-text>

            <v-card-actions v-if="!payload.report.resolved">
                <v-spacer />
                <!-- Cancel -->
                <v-btn color="error" text @click="close">
                    Cancel
                </v-btn>
                <v-btn color="green" @click="resolveReport">
                    Resolve
                </v-btn>
            </v-card-actions>
        </template>
    </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import AdminService from "@/api/services/AdminService";
import { RequestHandler } from "@/api/RequestHandler";
import Report from "@/api/models/Report.ts";
import { ImageUtil } from "@/util/ImageUtil.ts";
import ReportService from "@/api/services/ReportService";
import { ErrorHandler } from "@/api/error/ErrorHandler";

@Component
export default class ReportModal extends Vue {
    /**
     * Payload, passed when opening the modal.
     */
    @Prop()
    payload: { report: Report };

    getImageURL(report: Report): string {
        if (report.image != null) {
            return ImageUtil.getById(report.image.id);
        }
        return "";
    }

    /**
     * Resolve report.
     */
    resolveReport() {
        ReportService.update(this.payload.report.id, { resolved: true })
            .then(() => {
                // set report to resolved so it hides it
                this.payload.report.resolved = true;
                this.$store.dispatch("modal/close");
            })
            .catch((error) => {
                ErrorHandler.handle(error, {
                    id: "reportModal",
                    style: "SNACKBAR",
                });
            });
    }
    // resolve() {

    //}

    /**
     * Close the modal.
     */
    close() {
        this.$store.dispatch("modal/close");
    }
}
</script>

<style lang="scss">
img {
    max-width: 100%;
}
</style>
