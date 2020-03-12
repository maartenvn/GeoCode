<template>
    <v-container class="container--small">
        <!-- Loading -->
        <template v-if="locations.loading">
            <v-skeleton-loader dense type="table" />
        </template>

        <!-- Data -->
        <template v-else-if="locations.data">
            <div class="section">
                <v-row
                    class="section__title"
                    no-gutters
                    justify="space-between"
                    align="center"
                >
                    <v-col>Locations</v-col>

                    <v-col cols="auto">
                        <v-btn color="primary" text @click="openCreateLocation">
                            Create new location
                            <v-icon right>
                                mdi-plus-circle-outline
                            </v-icon>
                        </v-btn>
                    </v-col>
                </v-row>

                <div class="section__description">
                    GeoCode contains user defined locations in various countries
                    and cities in the world.
                </div>

                <div class="section__content mt-8">
                    <v-data-table
                        :headers="tableHeaders"
                        :search="tableSearch"
                        :items="locations.data"
                    >
                        <template v-slot:top>
                            <v-text-field
                                v-model="tableSearch"
                                append-icon="mdi-magnify"
                                label="Search"
                                single-line
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
                            <v-btn
                                :to="`location/${item.secretId}`"
                                color="primary"
                                text
                            >
                                View
                                <v-icon right>mdi-arrow-right</v-icon>
                            </v-btn>
                        </template>
                    </v-data-table>
                </div>
            </div>

            <div class="section">
                <!-- <location-map
                    height="400px"
                    width="70%"
                    :locations="locations.data"
                    :zoom="2"
                /> -->
            </div>
        </template>

        <!-- Error -->
        <template v-else>
            <error-handler errorId="location" />
        </template>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { fetchQuery } from "../util/fetchutil";
import { getLocations } from "../data/location";
import { DataTableHeader } from "vuetify";
import LocationCreateModal from "@/components/layout/modals/LocationCreateModal.vue";
import Query from "@/data/struct/Query";
import Location from "@/data/models/Location";
import LocationMap from "@/components/map/LocationMap.vue";

@Component({
    components: {
        LocationMap
    }
})
export default class LocationView extends Vue {
    tableHeaders: Array<DataTableHeader>;
    tableSearch: string;

    locations: Query<Array<Location>> = fetchQuery(getLocations(), {
        id: "location",
        style: "SECTION",
        displayFullpage: true
    });

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

        this.locations = fetchQuery(getLocations(), {
            id: "location",
            style: "SECTION",
            displayFullpage: true
        });
    }

    /**
     * Open a modal to create a new location.
     */
    openCreateLocation() {
        this.$store.dispatch("modal/open", {
            component: LocationCreateModal,
            width: 800,
            fullscreen: true
        });
    }
}
</script>
