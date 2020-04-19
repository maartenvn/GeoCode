<template>
    <div>
        <!-- Loading -->
        <template v-if="location.isLoading()">
            <v-skeleton-loader dense type="article" />
        </template>

        <!-- Data -->
        <template v-else-if="location.data">
            <div class="location__title">
                <inline-edit
                    :value="location.data.name"
                    :update="updateLocationName"
                    :enabled="isOwner"
                />
            </div>

            <div class="location__info">
                <!-- Loading -->
                <template v-if="statistics.isLoading()">
                    <v-skeleton-loader class="mt-2" type="text" width="300" />
                </template>

                <!-- Data -->
                <v-row v-else-if="statistics.isSuccess()">
                    <v-col cols="auto" class="d-flex">
                        <v-rating
                            class="pr-2"
                            :value="location.requireData().rating"
                            dense
                            small
                            readonly
                        />
                        {{ statistics.data.reviewsCount }} reviews
                    </v-col>

                    <v-divider class="divider--vertical" vertical />

                    <v-col cols="auto" class="d-flex">
                        <v-icon left>mdi-qrcode-scan</v-icon>
                        {{ statistics.data.visitsCount }} scans
                    </v-col>
                </v-row>
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
import Location from "@/api/models/Location";
import ErrorPlaceholder from "@/components/error/ErrorPlaceholder.vue";
import InlineEdit from "@/components/util/InlineEdit.vue";
import LocationService from "@/api/services/LocationService";
import User from "@/api/models/User";
import { StoreGetter } from "@/store/decorators/StoreGetterDecorator";
import LocationStatistics from "@/api/models/LocationStatistics";

@Component({
    components: {
        InlineEdit,
        ErrorPlaceholder,
    },
})
export default class LocationHeader extends Vue {
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
     * Update the location name.
     * @param value Value of the location name.
     */
    updateLocationName(value: string): EchoPromise<unknown> {
        return LocationService.update(this.location.requireData().secretId, {
            name: value,
        });
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
}
</script>

<style lang="scss">
.location {
    &__title {
        font-size: 2em;
    }
}
</style>
