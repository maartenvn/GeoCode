<template>
    <div>
        <!-- Loading -->
        <template v-if="tour.isLoading()">
            <v-skeleton-loader dense type="article" />
        </template>

        <!-- Data -->
        <template v-else-if="tour.isSuccess()">
            <!-- Warning: low ratings (lower than 2) -->
            <template v-if="isOwner && !tour.data.active">
                <v-alert type="warning" border="left" text>
                    Your tour is currently deactivated. Click the
                    "active"-button to activate it again.
                </v-alert>
            </template>

            <v-row justify="space-between" no-gutters>
                <v-col cols="auto">
                    <div class="tour__title">
                        <inline-edit
                            :value="tour.data.name"
                            :update="updateLocationName"
                            :enabled="isOwner"
                        />
                    </div>

                    <!-- Statistics -->
                    <div class="tour__info">
                        <!-- Loading -->
                        <template v-if="statistics.isLoading()">
                            <v-skeleton-loader
                                class="mt-2"
                                type="text"
                                width="300"
                            />
                        </template>

                        <!-- Data -->
                        <v-row v-else-if="statistics.isSuccess()">
                            <!-- Distance -->
                            <v-col cols="auto" class="d-flex">
                                <v-icon left>mdi-map-marker-distance</v-icon>
                                {{ tour.data.totalDistance.toFixed(2) }}
                                km
                            </v-col>

                            <v-divider class="divider--vertical" vertical />

                            <!-- Completion count -->
                            <v-col cols="auto" class="d-flex">
                                <v-icon left>mdi-account-check</v-icon>
                                {{ statistics.data.completionCount }}
                                completions
                            </v-col>
                        </v-row>
                    </div>
                </v-col>

                <v-col cols="auto" align-self="center">
                    <template v-if="isOwner">
                        <!-- Deactivate -->
                        <v-btn
                            v-if="tour.data.active"
                            color="warning"
                            text
                            @click="openDeactivateTour"
                        >
                            <v-icon left>
                                mdi-eye-off
                            </v-icon>

                            Deactivate
                        </v-btn>

                        <!-- Activate -->
                        <v-btn
                            v-else
                            color="primary"
                            text
                            @click="openActivateTour"
                        >
                            <v-icon left>
                                mdi-eye
                            </v-icon>

                            Activate
                        </v-btn>
                    </template>
                </v-col>
            </v-row>
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { EchoPromise } from "echofetch";
import InlineEdit from "@/components/util/InlineEdit.vue";
import Tour from "@/api/models/Tour";
import User from "@/api/models/User";
import TourService from "@/api/services/TourService";
import ConfirmModal from "@/components/modal/ConfirmModal.vue";
import { RouterUtil } from "@/util/RouterUtil";
import { ErrorHandler } from "@/api/error/ErrorHandler";
import TourStatistics from "@/api/models/TourStatistics";

@Component({
    components: { InlineEdit },
})
export default class TourHeader extends Vue {
    /**
     * Tour.
     */
    @Prop()
    tour: EchoPromise<Tour>;

    /**
     * Tour statistics.
     */
    @Prop()
    statistics: EchoPromise<TourStatistics>;

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
     * Update the tour name.
     * @param value Value of the tour name.
     */
    updateLocationName(value: string): EchoPromise<unknown> {
        return TourService.update(this.tour.requireData().secretId, {
            name: value,
        });
    }

    /**
     * Deactivate the tour.
     */
    openDeactivateTour() {
        this.$store.dispatch("modal/open", {
            component: ConfirmModal,
            componentPayload: {
                message: `Are you sure you want to deactivate this tour?`,
                action: (instance: Vue) => {
                    instance.$set(instance, "loading", true);

                    TourService.update(this.tour.requireData().secretId, {
                        active: false,
                    })
                        .then(() => {
                            RouterUtil.reload(this.$router);

                            // Close the modal.
                            this.$store.dispatch("modal/close");
                        })
                        .catch((error) =>
                            ErrorHandler.handle(error, {
                                id: "deactivateTour",
                                style: "SNACKBAR",
                            })
                        )
                        .finally(() =>
                            instance.$set(instance, "loading", false)
                        );
                },
            },
        });
    }

    /**
     * Activate the tour.
     */
    openActivateTour() {
        this.$store.dispatch("modal/open", {
            component: ConfirmModal,
            componentPayload: {
                message: `Are you sure you want to activate this tour?`,
                action: (instance: Vue) => {
                    instance.$set(instance, "loading", true);

                    TourService.update(this.tour.requireData().secretId, {
                        active: true,
                    })
                        .then(() => {
                            RouterUtil.reload(this.$router);

                            // Close the modal.
                            this.$store.dispatch("modal/close");
                        })
                        .catch((error) =>
                            ErrorHandler.handle(error, {
                                id: "activateTour",
                                style: "SNACKBAR",
                            })
                        )
                        .finally(() =>
                            instance.$set(instance, "loading", false)
                        );
                },
            },
        });
    }
}
</script>

<style lang="scss">
.tour {
    &__title {
        font-size: 2em;
    }
}
</style>
