<template>
    <div>
        <!-- Loading -->
        <template v-if="location.isLoading()">
            <v-skeleton-loader dense type="article" />
        </template>

        <!-- Data -->
        <template v-else-if="location.data">
            <v-row justify="space-between" no-gutters>
                <v-col cols="auto">
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
                            <v-skeleton-loader
                                class="mt-2"
                                type="text"
                                width="300"
                            />
                        </template>

                        <!-- Data -->
                        <v-row v-else-if="statistics.isSuccess()">
                            <v-col cols="auto" class="d-flex">
                                <v-rating
                                    class="pr-2"
                                    :value="location.requireData().rating"
                                    color="primary"
                                    background-color="primary"
                                    half-increments
                                    half-icon="mdi-star-half-full"
                                    dense
                                    small
                                    readonly
                                />
                                {{ statistics.data.ratingsCount }} reviews
                            </v-col>

                            <v-divider class="divider--vertical" vertical />

                            <v-col cols="auto" class="d-flex">
                                <v-icon left>mdi-qrcode-scan</v-icon>
                                {{ statistics.data.visitsCount }} scans
                            </v-col>
                        </v-row>
                    </div>
                </v-col>

                <v-col cols="auto" align-self="center">
                    <v-btn
                        v-if="isAuthenticated"
                        color="error"
                        text
                        @click="openCreateReport"
                    >
                        <v-icon left>
                            mdi-alert-octagon
                        </v-icon>

                        Report
                    </v-btn>

                    <v-btn
                        v-if="isOwner"
                        color="warning"
                        text
                        @click="openDeactivateLocation"
                    >
                        <v-icon left>
                            mdi-eye-off
                        </v-icon>

                        Deactivate
                    </v-btn>

                    <v-btn
                        v-if="isOwner"
                        color="primary"
                        text
                        @click="openQrCodeLocation"
                    >
                        <v-icon left>
                            mdi-qrcode
                        </v-icon>

                        Download QR-code
                    </v-btn>
                </v-col>
            </v-row>
        </template>

        <!-- Error -->
        <template v-else>
            <error-placeholder error-id="location" />
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { EchoError, EchoPromise } from "echofetch";
import Location from "@/api/models/Location";
import ErrorPlaceholder from "@/components/error/ErrorPlaceholder.vue";
import InlineEdit from "@/components/util/InlineEdit.vue";
import LocationService from "@/api/services/LocationService";
import User from "@/api/models/User";
import { StoreGetter } from "@/store/decorators/StoreGetterDecorator";
import { InputFields } from "@/types/fields/InputFields";
import { InputFieldUtil } from "@/util/InputFieldUtil";
import ReportService from "@/api/services/ReportService";
import { InputField } from "@/types/fields/InputField";
import ConfirmModal from "@/components/modal/ConfirmModal.vue";
import { ErrorHandler } from "@/api/error/ErrorHandler";
import { RouterUtil } from "@/util/RouterUtil";
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
     * If the user is authenticated.
     */
    @StoreGetter("session/isAuthenticated")
    isAuthenticated: boolean;

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
     * Open QR-code download modal
     */
    openQrCodeLocation() {
        this.$store.dispatch("modal/open", {
            component: () =>
                import("@/components/modal/location/qrcode/QrCodeModal.vue"),
            componentPayload: {
                secretId: this.location.requireData().secretId,
            },
        });
    }

    /**
     * Deactivate the location.
     */
    openDeactivateLocation() {
        this.$store.dispatch("modal/open", {
            component: ConfirmModal,
            componentPayload: {
                message: `Are you sure you want to deactivate this location?`,
                action: (instance: Vue) => {
                    instance.$set(instance, "loading", true);

                    LocationService.update(
                        this.location.requireData().secretId,
                        {
                            active: false,
                        }
                    )
                        .then(() => {
                            RouterUtil.reload(this.$router);

                            // Close the modal.
                            this.$store.dispatch("modal/close");
                        })
                        .catch((error) =>
                            ErrorHandler.handle(error, {
                                id: "deactivateLocation",
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
     * Open the create report modal.
     */
    openCreateReport() {
        this.$store.dispatch("modal/open", {
            component: () =>
                import(
                    "@/components/modal/location/report/ReportCreateModal.vue"
                ),
            componentPayload: {
                secretId: this.location.requireData().secretId,
                action: async (
                    fields: InputFields,
                    image: InputField,
                    instance: Vue
                ) => {
                    instance.$set(instance, "loading", true);

                    let imageId = null;

                    // Upload an image, when present.
                    if (image.value) {
                        const file = image.value as File;

                        try {
                            imageId = await ReportService.uploadImage(file);
                        } catch (err) {
                            // Handle the error.
                            const error = {
                                message: "Unable to upload image. Try again!",
                            } as EchoError;

                            ErrorHandler.handle(error, {
                                id: "reportUploadImage",
                                style: "SNACKBAR",
                            });

                            instance.$set(instance, "loading", false);

                            return;
                        }
                    }

                    // Create the report with the received
                    ReportService.create(this.location.requireData().secretId, {
                        ...InputFieldUtil.getValues(fields),
                        imageId,
                    })
                        .then(() => {
                            this.$store.dispatch("snackbar/open", {
                                message:
                                    "Your report has been submitted. Thank you",
                                color: "success",
                            });

                            this.$store.dispatch("modal/close");
                        })
                        .catch((error) => {
                            ErrorHandler.handle(
                                error,
                                {
                                    id: "reportCreate",
                                    style: "SNACKBAR",
                                },
                                fields
                            );
                        })
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
.location {
    &__title {
        font-size: 2em;
    }
}
</style>
