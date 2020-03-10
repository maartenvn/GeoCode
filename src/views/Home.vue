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
                    Find the hidden treasure containing a QR-code & some unknown
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

        <!-- Map -->
        <div class="map">
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
                    <locations-map :locations="locations" />
                </v-row>
            </v-responsive>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TutorialStep from "@/components/layout/views/home/TutorialStep.vue";
import LocationsMap from "@/components/LocationsMap.vue";
import Query from "../data/struct/Query";
import Location from "../data/models/Location";
import { getLocations } from "../data/location";
import { fetchQuery } from "../util/fetchutil";

@Component({
    components: {
        TutorialStep,
        LocationsMap
    }
})
export default class Home extends Vue {
    /**
     * List with all the locations in the database.
     */
    locations: Query<Array<Location>>;

    constructor() {
        super();

        this.locations = fetchQuery(getLocations(), {
            id: "locations",
            style: "CARD"
        });
    }
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

.map {
    text-align: center;
    background-color: var(--v-primary-base);
    color: #ffffff;
    padding: 20px;

    &__title {
        font-size: 2em;
    }

    &__description {
        font-size: 1.2em;
        font-weight: 300;
    }
}
</style>
