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
                        <v-row>
                            <v-col cols="auto" class="d-flex">
                                <v-rating
                                    class="pr-2"
                                    :value="3"
                                    dense
                                    small
                                    readonly
                                />
                                15 reviews
                            </v-col>

                            <v-divider class="divider--vertical" vertical />

                            <v-col cols="auto" class="d-flex">
                                <v-icon left>mdi-qrcode-scan</v-icon>
                                171 scans
                            </v-col>
                        </v-row>
                    </div>
                </v-col>

                <v-col cols="auto" align-self="center">
                    <v-btn color="error" text @click="openCreateReport">
                        <v-icon left>
                            mdi-alert-octagon
                        </v-icon>

                        Report
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
import { ErrorHandler } from "@/api/error/ErrorHandler";
import User from "@/api/models/User";
import { StoreGetter } from "@/store/decorators/StoreGetterDecorator";
import { InputFields } from "@/types/fields/InputFields";
import CommentService from "@/api/services/CommentService";
import { InputFieldUtil } from "@/util/InputFieldUtil";
import ReportService from "@/api/services/ReportService";

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
                action: async (fields: InputFields, instance: Vue) => {
                    instance.$set(instance, "loading", true);

                    let imageId = null;

                    // Upload an image, when present.
                    if (fields.image.value) {
                        const file = fields.image.value as File;
                        const formData = new FormData();

                        formData.append("file", file);

                        try {
                            imageId = await ReportService.uploadImage(formData);
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
