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
import { EchoPromise } from "echofetch";
import Location from "@/api/models/Location";
import ErrorPlaceholder from "@/components/error/ErrorPlaceholder.vue";
import InlineEdit from "@/components/util/InlineEdit.vue";
import LocationService from "@/api/services/LocationService";
import User from "@/api/models/User";
import { StoreGetter } from "@/store/decorators/StoreGetterDecorator";
import ConfirmModal from "@/components/modal/ConfirmModal.vue";
import { ErrorHandler } from "@/api/error/ErrorHandler";
import { RouterUtil } from "@/util/RouterUtil";

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
}
</script>

<style lang="scss">
.location {
    &__title {
        font-size: 2em;
    }
}
</style>
