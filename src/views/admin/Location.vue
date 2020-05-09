<template>
    <v-container class="container--small">
        <!-- Loading -->
        <template v-if="reports.isLoading()">
            <v-skeleton-loader type="heading" />
            <v-skeleton-loader type="table" dense />
        </template>

        <!-- Data -->
        <template v-else-if="reports.isSuccess()">
            <v-row no-gutters justify="space-between">
                <v-col cols="auto" align-self="center">
                    <h2>Reports for {{ location.data.name }}</h2>
                </v-col>

                <v-col cols="auto" align-self="center">
                    <v-btn
                        v-if="location.data.active"
                        color="warning"
                        dark
                        depressed
                        @click="setLocationActive(false)"
                        class="mx-2"
                    >
                        make inactive
                    </v-btn>

                    <v-btn
                        v-else
                        color="primary"
                        dark
                        depressed
                        @click="setLocationActive(true)"
                        class="mx-2"
                    >
                        make active
                    </v-btn>

                    <v-btn
                        color="error"
                        dark
                        depressed
                        @click="openConfirmDelete(location.data)"
                        class="mx-2"
                    >
                        delete
                    </v-btn>
                </v-col>
            </v-row>
            <template>
                <div>
                    <v-expansion-panels v-model="panel" flat class="mt-3">
                        <v-expansion-panel>
                            <v-expansion-panel-header
                                >Description</v-expansion-panel-header
                            >
                            <v-expansion-panel-content>
                                <p
                                    class="mt-2 text--secondary"
                                    v-html="location.data.description"
                                />
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </div>
            </template>

            <v-divider class="mb-3" />
            <div class="section__title">Reports</div>

            <v-data-table :headers="headers" :items="reports.data">
                <template v-slot:item.createdAt="{ item }">
                    {{ createdAtFormat(item.createdAt) }}
                </template>
                <template v-slot:item.action="{ item }">
                    <v-btn @click="openReport(item)" color="primary" text>
                        Show details
                        <v-icon right>mdi-arrow-right</v-icon>
                    </v-btn>
                </template>
                <template v-slot:item.resolved="{ item }">
                    <template v-if="item.resolved">
                        <v-chip color="success" text-color="white" small>
                            Resolved
                        </v-chip>
                    </template>

                    <template v-else>
                        <v-chip color="error" text-color="white" small>
                            Unresolved
                        </v-chip>
                    </template>
                </template>
            </v-data-table>
        </template>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import AdminService from "@/api/services/AdminService";
import LocationService from "@/api/services/LocationService";
import { RequestHandler } from "@/api/RequestHandler";
import Report from "@/api/models/Report.ts";
import ConfirmModal from "@/components/modal/ConfirmModal.vue";
import Location from "@/api/models/Location";
import { ErrorHandler } from "@/api/error/ErrorHandler";

@Component
export default class LocationReports extends Vue {
    /**
     * Secret ID of the location.
     * Should be passed by Vue Router.
     */
    @Prop()
    secretId: string;

    headers = [
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
            value: "resolved",
        },
        {
            text: "",
            value: "action",
            sortable: false,
            align: "end",
        },
    ];

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

    /**
     * Get the createdAt as a string.
     */
    createdAtFormat(dateString: string): string {
        const date = new Date(dateString);

        return date.toLocaleString();
    }

    /*
     *   set location active or inactive depending on the value passed
     */
    setLocationActive(value: boolean) {
        LocationService.update(this.secretId, { active: value })
            .then(() => (this.location.requireData().active = value))
            .catch((error) => {
                ErrorHandler.handle(error, {
                    id: "locationActivate",
                    style: "SNACKBAR",
                });
            });
    }

    /**
     * Open a model to confirm the delete of a location.
     * @param location Location to delete.
     */
    openConfirmDelete(location: Location) {
        this.$store.dispatch("modal/open", {
            component: ConfirmModal,
            componentPayload: {
                message: `Are you sure you want to delete '${location.name}?'`,
                action: () =>
                    LocationService.delete(location.secretId)
                        .then(() => {
                            // Close the modal.
                            this.$store.dispatch("modal/close");

                            // Redirect back to list of reported locations
                            this.$router.push({ name: "Admin Reports List" });

                            // Send confirmation
                            this.$store.dispatch("snackbar/open", {
                                message: "Location has been deleted",
                                color: "success",
                            });
                        })
                        .catch((error) => {
                            ErrorHandler.handle(error, {
                                style: "SNACKBAR",
                                id: "locationDelete",
                            });
                        }),
            },
        });
    }

    /*
     *   Open a modal to show report details
     */
    openReport(report: Report) {
        this.$store.dispatch("modal/open", {
            component: () => import("@/components/modal/admin/ReportModal.vue"),
            componentPayload: {
                report,
            },
        });
    }
}
</script>
