<template>
    <div>
        <!-- Loading -->
        <v-card v-if="loading" class="mb-3">
            <v-card-text>
                <v-skeleton-loader type="list-item-avatar-three-line" />
            </v-card-text>
        </v-card>

        <!-- Data -->
        <v-card
            v-else-if="creator.isLoading() || creator.isSuccess()"
            class="mb-3"
        >
            <v-card-text>
                <v-row>
                    <v-col cols="auto">
                        <v-avatar color="primary">
                            <img
                                v-if="creator.data.avatarUrl"
                                :src="creator.data.avatarUrl"
                                :alt="creator.data.username"
                            />

                            <span v-else class="white--text headline">
                                {{
                                    creator.data.username
                                        .toUpperCase()
                                        .charAt(0)
                                }}
                            </span>
                        </v-avatar>
                    </v-col>

                    <v-col>
                        <v-row class="pb-2" no-gutters>
                            <div class="rating__username">
                                <template v-if="creator.isLoading()">
                                    <v-skeleton-loader dense type="text" />
                                </template>

                                <template v-else-if="creator.isSuccess()">
                                    {{ creator.data.username }}
                                </template>
                            </div>

                            <v-spacer />

                            <v-rating
                                :value="rating.rating"
                                dense
                                small
                                readonly
                            />
                        </v-row>

                        <v-row class="rating__comment" no-gutters>
                            {{ rating.message }}
                        </v-row>
                    </v-col>
                </v-row>

                <!-- Delete -->
                <v-row v-if="isOwner" no-gutters justify="end">
                    <v-col cols="auto">
                        <v-btn color="error" icon @click="openConfirmDelete">
                            <v-icon>
                                mdi-delete
                            </v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>

        <!-- Error -->
        <error-placeholder v-else-if="creator.isError()" id="ratingCreator" />
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { RequestHandler } from "@/api/RequestHandler";
import { EchoPromise } from "echofetch";
import ErrorPlaceholder from "@/components/error/ErrorPlaceholder.vue";
import Rating from "@/api/models/Rating";
import UsersService from "@/api/services/UsersService";
import User from "@/api/models/User";
import { StoreGetter } from "@/store/decorators/StoreGetterDecorator";
import Location from "@/api/models/Location";
import ConfirmModal from "@/components/modal/ConfirmModal.vue";
import LocationService from "@/api/services/LocationService";
import { ErrorHandler } from "@/api/error/ErrorHandler";
import RatingService from "@/api/services/RatingService";

@Component({
    components: { ErrorPlaceholder }
})
export default class LocationRatingCard extends Vue {
    /**
     * If in loading state.
     */
    @Prop({ default: false })
    loading: boolean;

    /**
     * Rating for the card to display
     */
    @Prop()
    rating: Rating;

    /**
     * Get the user for the rating.
     */
    creator: EchoPromise<User>;

    /**
     * Get the current logged in user.
     */
    @StoreGetter("session/currentUser")
    currentUser: EchoPromise<User>;

    constructor() {
        super();

        if (!this.loading) {
            this.creator = RequestHandler.handle(
                UsersService.get(this.rating.creator.id),
                {
                    id: "ratingCreator",
                    style: "CARD"
                }
            );
        }
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
     * Open a model to confirm the delete of a rating.
     */
    openConfirmDelete() {
        this.$store.dispatch("modal/open", {
            component: ConfirmModal,
            componentPayload: {
                message: `Are you sure you want to delete this rating? This action is permanent and cannot be undone!'`,
                action: () =>
                    RatingService.delete(this.rating.id)
                        .then(() => {
                            // Close the modal.
                            this.$store.dispatch("modal/close");

                            // Execute the delete action.
                            this.$emit("deleteAction", this.rating);

                            // Send confirmation message.
                            this.$store.dispatch("snackbar/open", {
                                message: "Rating has been deleted",
                                color: "success"
                            });
                        })
                        .catch(error => {
                            ErrorHandler.handle(error, {
                                style: "SNACKBAR",
                                id: "ratingDelete"
                            });
                        })
            }
        });
    }
}
</script>

<style lang="scss">
.rating {
    &__username {
        font-size: 1.1em;
        font-weight: bold;
    }
}
</style>
