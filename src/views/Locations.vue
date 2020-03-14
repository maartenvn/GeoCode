<template>
    <v-container class="container--small">
        <!-- Loading -->
        <template v-if="locations.loading">
            <v-skeleton-loader type="article" />
            <v-skeleton-loader />
            <v-skeleton-loader class="skeleton__map" type="image" />
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
                    and cities in the world. Use the map below to find a
                    location near any place you want to visit. You can type a
                    location in the searchbar below.
                </div>
            </div>

            <v-row>
                <v-col cols="12">
                    <v-tabs v-model="tab" centered icons-and-text>
                        <v-tabs-slider />

                        <v-tab href="#tab-map">
                            Search by map
                            <v-icon>mdi-map</v-icon>
                        </v-tab>

                        <v-tab href="#tab-name">
                            Search by location
                            <v-icon>mdi-textbox</v-icon>
                        </v-tab>
                    </v-tabs>

                    <v-row>
                        <v-col cols="12">
                            <v-tabs-items v-model="tab">
                                <v-tab-item value="tab-map">
                                    <location-map
                                        height="55vh"
                                        width="100%"
                                        :locations="locations"
                                        :zoom="2"
                                        :searchEnabled="true"
                                    />
                                </v-tab-item>
                                <v-tab-item value="tab-name">
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
                                            No locations found with the given
                                            parameters
                                        </template>

                                        <template v-slot:item.action="{ item }">
                                            <v-btn
                                                :to="
                                                    `location/${item.secretId}`
                                                "
                                                color="primary"
                                                text
                                            >
                                                View
                                                <v-icon right
                                                    >mdi-arrow-right</v-icon
                                                >
                                            </v-btn>
                                        </template>
                                    </v-data-table>
                                </v-tab-item>
                            </v-tabs-items>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
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
    tab: any;
    tableHeaders: Array<DataTableHeader>;
    tableSearch: string;

    locations: Query<Array<Location>> = fetchQuery(getLocations(), {
        id: "location",
        style: "SECTION",
        displayFullpage: true
    });

    constructor() {
        super();

        this.tab = null;
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

<style lang="scss">
.skeleton {
    &__map {
        margin-top: 100px;
        height: 400px;

        > div {
            height: 100% !important;
        }
    }
}
</style>
