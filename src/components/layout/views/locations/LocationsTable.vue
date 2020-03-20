<template>
    <div>
        <!-- Loading -->
        <template v-if="locations.loading">
            <v-skeleton-loader dense type="table" />
        </template>

        <!-- Data -->
        <template v-else-if="locations.data">
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

                <template v-slot:item.action="{ item }">
                    <!-- Delete -->
                    <v-btn
                        v-if="deleteEnabled"
                        color="error"
                        text
                        @click="openConfirmDeleteLocation(item)"
                    >
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>

                    <!-- View -->
                    <v-btn
                        :to="`/location/${item.secretId}`"
                        color="primary"
                        text
                    >
                        View
                        <v-icon right>mdi-arrow-right</v-icon>
                    </v-btn>
                </template>
            </v-data-table>
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { DataTableHeader } from "vuetify";
import Query from "@/api/struct/Query";
import Location from "@/api/models/Location";
import LocationService from "@/api/services/LocationService";
import ConfirmationModal from "@/components/modals/ConfirmationModal.vue";

@Component
export default class LocationsTable extends Vue {
    /**
     * List with locations.
     */
    @Prop()
    locations: Query<Array<Location>>;

    /**
     * Should a delete button be showed.
     */
    @Prop({ default: false })
    deleteEnabled: boolean;

    /**
     * List with headers for the Vuetify data table.
     */
    tableHeaders: Array<DataTableHeader>;

    /**
     * Value of the search field.
     */
    tableSearch: string;

    constructor() {
        super();

        this.tableHeaders = [
            {
                text: "Name",
                value: "name"
            },
            {
                text: "",
                value: "action",
                sortable: false,
                align: "end"
            }
        ];
        this.tableSearch = "";
    }

    /**
     * Open a model to confirm the delete of a location.
     * @param location Location to delete.
     */
    openConfirmDeleteLocation(location: Location) {
        this.$store.dispatch("modal/open", {
            component: ConfirmationModal,
            componentPayload: {
                message: `Are you sure you want to delete '${location.name}? This action is permanent and cannot be undone!'`,
                action: () =>
                    LocationService.delete(location)
                        .then(data => {
                            // Close the modal.
                            this.$store.dispatch("modal/close");

                            // Remove the location from the table.
                            this.locations.data.splice(
                                this.locations.data.indexOf(location),
                                1
                            );

                            // Send confirmation message.
                            this.$store.dispatch("snackbar/open", {
                                message: "Location has been deleted",
                                color: "success"
                            });
                        })
                        .catch(error => {
                            this.$error(error, {
                                style: "SNACKBAR",
                                id: "locationDelete"
                            });
                        })
            }
        });
    }
}
</script>
