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
     * Close the modal.
     */
    close() {
        this.$store.dispatch("modal/close");
    }
}
</script>
