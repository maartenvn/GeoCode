<template>
    <div>
        <!-- Loading -->
        <template v-if="tours.isLoading()">
            <v-skeleton-loader dense type="table" />
        </template>

        <!-- Data -->
        <template v-else-if="tours.isSuccess()">
            <v-data-table
                :headers="tableHeaders"
                :search="tableSearch"
                :items="toursData"
            >
                <template v-slot:top>
                    <v-text-field
                        v-model="tableSearch"
                        prepend-icon="mdi-database-marker"
                        label="Search for a tour name or country"
                        single-line
                        outlined
                        dense
                    />
                </template>

                <template v-slot:no-data>
                    No tours available
                </template>

                <template v-slot:no-results>
                    No tours found with the given parameters
                </template>

                <template v-slot:item.active="{ item }">
                    <template v-if="activeEnabled">
                        <template v-if="!item.active">
                            <v-chip color="warning" text-color="white" small>
                                Not activated
                            </v-chip>
                        </template>

                        <template v-else>
                            <v-chip color="success" text-color="white" small>
                                Activated
                            </v-chip>
                        </template>
                    </template>
                </template>

                <template v-slot:item.totalDistance="{ item }">
                    <v-chip
                        :color="getDistanceColor(item.totalDistance)"
                        text-color="white"
                        small
                    >
                        {{ item.totalDistance.toFixed(2) }} km
                    </v-chip>
                </template>

                <template v-slot:item.action="{ item }">
                    <!-- Delete -->
                    <v-btn
                        v-if="deleteEnabled"
                        color="error"
                        text
                        @click="openConfirmDelete(item)"
                    >
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>

                    <!-- View -->
                    <v-btn
                        v-if="item.active || !activeEnabled"
                        :to="`/tours/${item.secretId}`"
                        color="primary"
                        text
                    >
                        View
                        <v-icon right>mdi-arrow-right</v-icon>
                    </v-btn>

                    <v-btn
                        v-else
                        :to="`/tours/${item.secretId}`"
                        color="warning"
                        text
                    >
                        Activate
                        <v-icon right>mdi-arrow-right</v-icon>
                    </v-btn>
                </template>
            </v-data-table>
        </template>

        <!-- Error -->
        <template v-else-if="tours.isError()">
            <error-placeholder error-id="tours" />
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { EchoPromise } from "echofetch";
import { ArrayUtil } from "@/util/ArrayUtil";
import { ErrorHandler } from "@/api/error/ErrorHandler";
import Tour from "@/api/models/Tour";
import ConfirmModal from "@/components/modal/ConfirmModal.vue";
import TourService from "@/api/services/TourService";
import ErrorPlaceholder from "@/components/error/ErrorPlaceholder.vue";

@Component({
    components: { ErrorPlaceholder },
})
export default class ToursTable extends Vue {
    /**
     * List with tours.
     */
    @Prop()
    tours: EchoPromise<Array<Tour>>;

    /**
     * Should a delete button be showed.
     */
    @Prop({ default: false })
    deleteEnabled: boolean;

    /**
     * Should the "active"-column be showed.
     */
    @Prop({ default: false })
    activeEnabled: boolean;

    /**
     * List with headers for the Vuetify data table.
     */
    tableHeaders = [
        {
            text: "Name",
            value: "name",
        },
        {
            text: "Country",
            value: "country",
        },
        {
            text: "Distance",
            value: "totalDistance",
        },
        {
            text: "",
            value: "active",
        },
        {
            text: "",
            value: "action",
            sortable: false,
            align: "end",
        },
    ];

    /**
     * Value of the search field.
     */
    tableSearch = "";

    /**
     * Get the list with tours in a modified form to display inside the table.
     */
    get toursData(): Array<Tour> {
        return this.tours.requireData().map((tour) => {
            // Convert the locations to a list of unique country names.
            // Using set and casting back to array to remove duplicates.
            const country = [
                ...new Set(tour.locations.map((tour) => tour.country)),
            ].join(", ");

            return {
                ...tour,
                country,
            };
        });
    }

    /**
     * Get the distance color for a given distance.
     *  0 km - 5 km: green
     *  5 km - 10 km: orange
     *  10 km - ...: red
     */
    getDistanceColor(distance: number): string {
        // 0 km - 5 km: green
        if (distance >= 0 && distance <= 5) {
            return "success";
        }

        // 5 km - 10 km: orange
        if (distance > 5 && distance <= 10) {
            return "warning";
        }

        // 10 km - ...: red
        if (distance > 10) {
            return "error";
        }

        return "primary";
    }

    /**
     * Open a model to confirm the delete of a tour.
     * @param tour Tour to delete.
     */
    openConfirmDelete(tour: Tour) {
        this.$store.dispatch("modal/open", {
            component: ConfirmModal,
            componentPayload: {
                message: `Are you sure you want to delete '${tour.name}? This action is permanent and cannot be undone!'`,
                action: () =>
                    TourService.delete(tour.secretId)
                        .then(() => {
                            // Close the modal.
                            this.$store.dispatch("modal/close");

                            // Remove the location from the table.
                            ArrayUtil.delete(this.tours.requireData(), tour);

                            // Send confirmation message.
                            this.$store.dispatch("snackbar/open", {
                                message: "Tour has been deleted",
                                color: "success",
                            });
                        })
                        .catch((error) => {
                            ErrorHandler.handle(error, {
                                style: "SNACKBAR",
                                id: "tourDelete",
                            });
                        }),
            },
        });
    }
}
</script>
