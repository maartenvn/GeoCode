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

                    <div
                        class="section__content"
                        v-html="location.data.description"
                    ></div>
                </v-col>

                <v-divider class="ml-10" vertical />

                <v-col cols="12" sm="auto">
                    <div class="section__title">
                        Extra information
                    </div>

                    <div class="section__content">
                        <span class="li__title">
                            Coordinates
                        </span>
                        <ul class="li__content">
                            <li>{{ latitudeDMS }}</li>
                            <li>{{ longitudeDMS }}</li>
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
                            06/03/2020
                        </span>

                        <span class="li__title">
                            Last scan
                        </span>
                        <span class="li__content">
                            5 hours ago
                        </span>
                    </div>
                </v-col>
            </v-row>

            <div class="section">
                <div class="section__title">
                    <span>Location on map</span>

                    <v-spacer />

                    <v-btn color="primary" text>Open in maps</v-btn>
                </div>

                <div class="section__content">
                    <location-map
                        height="500px"
                        width="100%"
                        :location="location"
                        :center="[
                            location.data.latitude,
                            location.data.longitude,
                        ]"
                        :zoom="15"
                    />
                </div>
            </div>
        </template>

        <!-- Error -->
        <template v-else>
            <error-placeholder error-id="location" />
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { EchoPromise } from "echofetch";
import { CoordinatesUtil } from "@/util/CoordinatesUtil";
import Location from "@/api/models/Location";
import LocationMap from "@/components/map/location/LocationMap.vue";
import ErrorPlaceholder from "@/components/error/ErrorPlaceholder.vue";
import User from "@/api/models/User";

@Component({
    components: {
        ErrorPlaceholder,
        LocationMap,
    },
})
export default class LocationInformation extends Vue {
    /**
     * Location.
     */
    @Prop()
    location: EchoPromise<Location>;

    /**
     * Creator for the given location.
     */
    @Prop()
    creator: EchoPromise<User>;

    /**
     * Get the latitude value in DMS.
     */
    get latitudeDMS(): string {
        return CoordinatesUtil.latToDMS(this.location.requireData().latitude);
    }

    /**
     * Get the longitude value in DMS.
     */
    get longitudeDMS(): string {
        return CoordinatesUtil.lngToDMS(this.location.requireData().longitude);
    }
}
</script>
