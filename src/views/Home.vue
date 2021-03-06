<template>
    <div>
        <!-- Hero -->
        <div class="hero pt-0 pt-sm-10">
            <v-responsive class="mx-auto" min-height="30vh" :max-width="1280">
                <v-row>
                    <v-col cols="12" sm="6">
                        <!-- Title -->
                        <div class="hero__title white--text">GeoCode</div>

                        <!-- Description -->
                        <div class="hero__description white--text">
                            Find & create amazing locations to explore and share
                            with others. GeoCode is the new way of Geocaching
                            you have been dreaming of.

                            <div class="mt-10">
                                <v-btn
                                    v-if="!isAuthenticated"
                                    to="/register"
                                    color="secondary"
                                    large
                                >
                                    Register for free
                                </v-btn>
                            </div>
                        </div>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-img
                            max-height="300"
                            src="@/assets/img/hero.svg"
                            contain
                        />
                    </v-col>
                </v-row>
            </v-responsive>

            <v-btn
                class="hero__arrow"
                fab
                dark
                color="secondary"
                @click="$vuetify.goTo('#step-1')"
            >
                <v-icon dark>mdi-chevron-down</v-icon>
            </v-btn>
        </div>

        <!-- Tutorial -->
        <div class="tutorial">
            <!-- Step 1 -->
            <tutorial-step
                id="step-1"
                :image="require('@/assets/img/tutorial_step_1.svg')"
            >
                <template v-slot:title>
                    Find an amazing location
                </template>

                <template v-slot:description>
                    Browse through a list of amazing locations to find where you
                    want to go and explore.
                </template>
            </tutorial-step>

            <!-- Step 2 -->
            <tutorial-step
                id="step-2"
                :image="require('@/assets/img/tutorial_step_2.svg')"
                :invert="true"
            >
                <template v-slot:title>
                    Explore the hidden treasure
                </template>

                <template v-slot:description>
                    Find the hidden treasure containing a QR-code & some hidden
                    loot.
                </template>
            </tutorial-step>

            <!-- Step 3 -->
            <tutorial-step
                id="step-3"
                :image="require('@/assets/img/tutorial_step_3.svg')"
            >
                <template v-slot:title>
                    Share your experience
                </template>

                <template v-slot:description>
                    Scan the QR-code to leave a comment & share with the world
                    were you have been.
                </template>
            </tutorial-step>
        </div>

        <!-- Statistics -->
        <section class="statistics">
            <!-- Loading -->
            <v-row v-if="statistics.isLoading()">
                <v-col cols="12" sm="6" md="4">
                    <statistics-card :loading="true" :flat="true" />
                </v-col>

                <v-col cols="12" sm="6" md="4">
                    <statistics-card :loading="true" :flat="true" />
                </v-col>

                <v-col cols="12" sm="6" md="4">
                    <statistics-card :loading="true" :flat="true" />
                </v-col>
            </v-row>

            <!-- Data -->
            <v-row v-else-if="statistics.isSuccess()">
                <v-col cols="12" sm="6" md="4">
                    <statistics-card
                        title="Different locations"
                        :value="statistics.data.locationsCount"
                        :flat="true"
                    />
                </v-col>

                <v-col cols="12" sm="6" md="4">
                    <statistics-card
                        title="Different countries"
                        :value="statistics.data.countriesCount"
                        :flat="true"
                    />
                </v-col>

                <v-col cols="12" sm="6" md="4">
                    <statistics-card
                        title="Active users"
                        :value="statistics.data.usersCount"
                        :flat="true"
                    />
                </v-col>
            </v-row>

            <!-- Error -->
            <error-placeholder v-else error-id="statistics" />
        </section>

        <!-- Map -->
        <section class="map">
            <v-responsive class="mx-auto" min-height="30vh" :max-width="1280">
                <v-row>
                    <v-col>
                        <div class="map__title">
                            Locations to explore.
                        </div>

                        <div class="map__description">
                            Find interesting locations to visit & explore and go
                            were you never went before!
                        </div>
                    </v-col>
                </v-row>

                <v-row class="mt-4" align-content="center" justify="center">
                    <location-map
                        height="300px"
                        width="70%"
                        :locations="locations"
                        :zoom="2"
                    />
                </v-row>
            </v-responsive>
        </section>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { StoreGetter } from "@/store/decorators/StoreGetterDecorator";
import TutorialStep from "@/components/view/home/HomeTutorialStep.vue";
import LocationService from "@/api/services/LocationService";
import { RequestHandler } from "@/api/RequestHandler";
import StatisticsCard from "@/components/statistics/StatisticsCard.vue";
import StatisticsService from "@/api/services/StatisticsService";
import ErrorPlaceholder from "@/components/error/ErrorPlaceholder.vue";

@Component({
    components: {
        StatisticsCard,
        TutorialStep,
        ErrorPlaceholder,
        LocationMap: () => import("@/components/map/location/LocationMap.vue"),
    },
})
export default class Home extends Vue {
    /**
     * List with all the location in the database.
     */
    locations = RequestHandler.handle(LocationService.getAll(), {
        id: "locations",
        style: "CARD",
    });

    /**
     * Statistics for the logged in user.
     */
    statistics = RequestHandler.handle(StatisticsService.get(), {
        id: "statistics",
        style: "SECTION",
    });

    /**
     * If the client is logged in.
     */
    @StoreGetter("session/isAuthenticated")
    isAuthenticated: boolean;
}
</script>

<style lang="scss" scoped>
.hero {
    background: linear-gradient(to bottom, #4caf50, #8bc34a);
    min-height: 100px;
    padding: 0px 25px 60px 25px;

    &__title {
        font-size: 2.5em;
        font-weight: 400;
        line-height: 1.8;
    }

    &__description {
        font-size: 1.5em;
        font-weight: 300;
        line-height: 1.8;
    }

    &__arrow {
        position: absolute;
        margin-top: 30px;
        left: 50%;
        transform: translate(-50%, 0);
    }
}

.tutorial {
    margin-top: 75px;
}

.statistics {
    text-align: center;
    background-color: var(--v-primary-base);
    color: #ffffff;
    padding: 20px;
}

.map {
    text-align: center;
    padding: 20px;
    background-color: var(--v-primary-base);
    color: #ffffff;

    &__title {
        font-size: 2em;
    }

    &__description {
        font-size: 1.2em;
        font-weight: 300;
    }
}
</style>
