<template>
    <div>
        <!-- Loading -->
        <template v-if="locations.isLoading()">
            <v-skeleton-loader dense type="table" />
        </template>

        <!-- Data -->
        <template v-else-if="locations.isSuccess()">
            <v-data-table
                :headers="tableHeaders"
                :search="tableSearch"
                :items="locations.data"
            >
                <template v-slot:top>
                    <v-text-field
                        v-model="tableSearch"
                        prepend-icon="mdi-database-marker"
                        label="Search for a location"
                        single-line
                        outlined
                        dense
                    />
                </template>

                <template v-slot:no-data>
                    No locations available
                </template>

                <template v-slot:no-results>
                    No locations found with the given parameters
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
                        :to="`/locations/${item.secretId}`"
                        color="primary"
                        text
                    >
                        View
                        <v-icon right>mdi-arrow-right</v-icon>
                    </v-btn>

                    <v-btn
                        v-else
                        :to="`/locations/${item.secretId}`"
                        color="warning"
                        text
                    >
                        Activate
                        <v-icon right>mdi-arrow-right</v-icon>
                    </v-btn>
                </template>
            </v-data-table>
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { EchoPromise } from "echofetch";
import { ErrorHandler } from "@/api/error/ErrorHandler";
import Location from "@/api/models/Location";
import LocationService from "@/api/services/LocationService";
import ConfirmModal from "@/components/modal/ConfirmModal.vue";

@Component
export default class LocationsTable extends Vue {
    /**
     * List with locations.
     */
    @Prop()
    locations: EchoPromise<Array<Location>>;

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
     * Open a model to confirm the delete of a location.
     * @param location Location to delete.
     */
    openConfirmDelete(location: Location) {
        this.$store.dispatch("modal/open", {
            component: ConfirmModal,
            componentPayload: {
                message: `Are you sure you want to delete '${location.name}? This action is permanent and cannot be undone!'`,
                action: () =>
                    LocationService.delete(location.secretId)
                        .then((data) => {
                            // Close the modal.
                            this.$store.dispatch("modal/close");

                            // Remove the location from the table.
                            this.locations
                                .requireData()
                                .splice(
                                    this.locations
                                        .requireData()
                                        .indexOf(location),
                                    1
                                );

                            // Send confirmation message.
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
}
</script>
