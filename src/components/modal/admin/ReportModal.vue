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

            <v-card-actions>
                <v-spacer />

                <v-btn
                    v-if="!payload.report.resolved"
                    dark
                    depressed
                    color="primary"
                    @click="resolveReport(true)"
                >
                    Resolve
                </v-btn>

                <v-btn
                    v-else
                    dark
                    depressed
                    color="warning"
                    @click="resolveReport(false)"
                >
                    Unresolve
                </v-btn>
            </v-card-actions>
        </template>
    </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
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

    /*
     *   use the image id to make a usable image url
     */
    getImageURL(report: Report): string {
        if (report.image != null) {
            return ImageUtil.getById(report.image.id);
        }
        return "";
    }

    /**
     * Resolve report.
     */
    resolveReport(value: boolean) {
        ReportService.update(this.payload.report.id, { resolved: value })
            .then(() => {
                // set report to correct resolve status so it shows in the table
                this.payload.report.resolved = value;
                this.$store.dispatch("modal/close");
            })
            .catch((error) => {
                ErrorHandler.handle(error, {
                    id: "reportModal",
                    style: "SNACKBAR",
                });
            });
    }

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
