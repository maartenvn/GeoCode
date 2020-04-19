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
                        :update="updateLocationName"
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
                            {{ createdAtFormat }}
                        </span>

                        <span class="li__title">
                            Last scan
                        </span>
                        <span class="li__content">
                            {{ lastVisitFormat }}
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
import { StoreGetter } from "@/store/decorators/StoreGetterDecorator";
import LocationService from "@/api/services/LocationService";
import InlineEdit from "@/components/util/InlineEdit.vue";
import LocationStatistics from "@/api/models/LocationStatistics";

@Component({
    components: {
        ErrorPlaceholder,
        LocationMap,
        InlineEdit,
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
     * Statistics for the location.
     */
    @Prop()
    statistics: EchoPromise<LocationStatistics>;

    /**
     * Current user
     */
    @StoreGetter("session/currentUser")
    currentUser: EchoPromise<User>;

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

    /**
     * Get the createdAt as a string.
     */
    get createdAtFormat(): string {
        const date = new Date(this.location.requireData().createdAt);

        return date.toLocaleDateString();
    }

    /**
     * Get the last visit timestamp as a string.
     */
    get lastVisitFormat(): string {
        if (this.statistics.isSuccess()) {
            const date = new Date(
                this.statistics.requireData().lastVisit.timestamp
            );
            const currentDate = new Date();

            const diff = Math.abs(currentDate.getDate() - date.getDate());
            const hours = Math.floor(diff / 36e5);
            const minutes = Math.floor(diff / 1000 / 60);

            if (hours >= 48) {
                return date.toLocaleDateString();
            }

            if (minutes >= 60) {
                return `${hours} hour(s) ago`;
            }

            if (minutes < 1) {
                return "Just now";
            }

            return `${minutes} minute(s) ago`;
        }

        return "";
    }

    /**
     * Get if the current user is the owner of the location.
     */
    get isOwner() {
        return (
            this.creator &&
            this.currentUser &&
            this.creator.isSuccess() &&
            this.currentUser.isSuccess() &&
            this.creator.requireData().id === this.currentUser.requireData().id
        );
    }

    /**
     * Update the location description.
     * @param value Value of the location description.
     */
    updateLocationName(value: string): EchoPromise<unknown> {
        return LocationService.update(this.location.requireData().secretId, {
            description: value,
        });
    }
}
</script>
