<template>
    <div>
        <!-- Loading -->
        <template v-if="location.isLoading()">
            <v-skeleton-loader dense type="article" />
        </template>

        <!-- Data -->
        <template v-else-if="location.data">
            <v-row>
                <v-col class="section" cols="12" sm="8">
                    <div class="section__title">
                        Overview
                    </div>

                    <!-- Editor -->
                    <inline-edit
                        v-model="location.data.description"
                        :update="updateTourDescription"
                        :enabled="isOwner"
                        :is-editor="true"
                    >
                        <div
                            class="section__content text--secondary"
                            v-html="location.data.description"
                        />
                    </inline-edit>
                </v-col>

                <v-divider class="ml-10" vertical />

                <v-col cols="12" sm="auto">
                    <div class="section__title">
                        Extra information
                    </div>

                    <div class="section__content">
                        <span class="li__title">
                            Locations
                        </span>

                        <ul class="li__content">
                            <li>
                                <a
                                    v-for="(location, index) of tour.data
                                        .locations"
                                    :key="index"
                                    :to="`/locations/${location.secretId}`"
                                >
                                    {{ location.name }}
                                </a>
                            </li>
                        </ul>

                        <span class="li__title">
                            Created by
                        </span>
                        <span class="li__content">
                            <template v-if="creator && creator.isLoading()">
                                <v-skeleton-loader dense type="text" />
                            </template>

                            <template v-else-if="creator.isSuccess()">
                                <a>{{ creator.data.username }}</a>
                            </template>
                        </span>

                        <span class="li__title">
                            Created on
                        </span>
                        <span class="li__content">
                            {{ createdAtFormat }}
                        </span>
                    </div>
                </v-col>
            </v-row>

            <div class="section">
                <div class="section__title">
                    <span>Tour on map</span>
                </div>

                <div class="section__content">
                    <tour-map
                        height="500px"
                        width="100%"
                        :tour-locations="tour.data.locations"
                        :center="center"
                        :zoom="15"
                    />
                </div>
            </div>
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { EchoPromise } from "echofetch";
import Tour from "@/api/models/Tour";
import User from "@/api/models/User";
import TourService from "@/api/services/TourService";
import InlineEdit from "@/components/util/InlineEdit.vue";
import TourMap from "@/components/map/tour/TourMap.vue";
import { LatLngTuple } from "leaflet";

@Component({
    components: { TourMap, InlineEdit },
})
export default class TourInformation extends Vue {
    /**
     * Tour.
     */
    @Prop()
    tour: EchoPromise<Tour>;

    /**
     * Creator of the tour
     */
    @Prop()
    creator: EchoPromise<User>;

    /**
     * If the current logged in user is the owner of the tour.
     */
    @Prop({ default: false })
    isOwner: boolean;

    /**
     * Get the createdAt as a string.
     */
    get createdAtFormat(): string {
        const date = new Date(this.tour.requireData().createdAt);

        return date.toLocaleDateString();
    }

    /**
     * Get the center of the map based on the given tour locations.
     * It will take the first location as center of the map.
     */
    get center(): LatLngTuple {
        let _center: LatLngTuple = [0, 0];

        if (
            this.tour.isSuccess() &&
            this.tour.requireData().locations &&
            this.tour.requireData().locations.length >= 1
        ) {
            const firstLocation = this.tour.requireData().locations[0];
            _center = [firstLocation.latitude, firstLocation.longitude];
        }

        return _center;
    }

    /**
     * Update the tour description.
     * @param value Value of the tour description.
     */
    updateTourDescription(value: string): EchoPromise<unknown> {
        return TourService.update(this.tour.requireData().secretId, {
            description: value,
        });
    }
}
</script>
