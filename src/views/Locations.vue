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
                        <v-btn
                            v-if="isAuthenticated"
                            color="primary"
                            depressed
                            @click="openCreateLocation"
                        >
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
                    <v-tabs v-model="tab" centered show-arrows icons-and-text>
                        <v-tabs-slider />

                        <v-tab href="#tab-map">
                            Search by map
                            <v-icon>mdi-map</v-icon>
                        </v-tab>

                        <v-tab href="#tab-name">
                            Search by name
                            <v-icon>mdi-textbox</v-icon>
                        </v-tab>
                    </v-tabs>

                    <v-row>
                        <v-col cols="12">
                            <v-tabs-items v-model="tab" touchless>
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
                                    <locations-table :locations="locations" />
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
import LocationsTable from "@/components/layout/views/locations/LocationsTable.vue";
import { StoreGetter } from "../store/decorator";

@Component({
    components: {
        LocationMap,
        LocationsTable
    }
})
export default class LocationView extends Vue {
    tab: any;

    locations: Query<Array<Location>> = fetchQuery(getLocations(), {
        id: "location",
        style: "SECTION",
        displayFullpage: true
    });

    /**
     * If the client is logged in.
     */
    @StoreGetter("session/isAuthenticated")
    isAuthenticated: boolean;

    constructor() {
        super();

        this.tab = null;

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
            component: () =>
                import("@/components/layout/modals/LocationCreateModal.vue"),
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
