<template>
    <div class="section">
        <div class="section__title">
            Ratings

            <v-spacer />

            <v-btn color="primary" text @click="openCreateRating">
                Leave a review
                <v-icon right>mdi-plus-circle-outline</v-icon>
            </v-btn>
        </div>

        <div class="section__content">
            <!-- Loading -->
            <template v-if="ratings.isLoading()">
                <location-rating-card
                    v-for="index in 3"
                    :key="index"
                    :loading="true"
                />
            </template>

            <!-- Data -->
            <template v-else-if="ratings.isSuccess()">
                <!-- Not Empty -->
                <template v-if="ratings.data && ratings.data.length > 0">
                    <location-rating-card
                        v-for="(rating, index) of ratings.data"
                        :key="index"
                        :rating="rating"
                        @deleteAction="openDeleteRating(rating)"
                        @modifyAction="openModifyRating(rating)"
                    />
                </template>

                <!-- Empty -->
                <template v-else>
                    <div class="text-center mt-10">
                        <h3>No ratings where found</h3>
                        <p>
                            Be the first one to leave a review! Click the "leave
                            a review"-button to leave a review!
                        </p>
                    </div>
                </template>
            </template>

            <!-- Error -->
            <template v-else>
                <error-placeholder error-id="ratings" class="text-center" />
            </template>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { RequestHandler } from "@/api/RequestHandler";
import LocationRatingCard from "@/components/view/location/rating/LocationRatingCard.vue";
import RatingService from "@/api/services/RatingService";
import Rating from "@/api/models/Rating";
import ErrorPlaceholder from "@/components/error/ErrorPlaceholder.vue";
import ConfirmModal from "@/components/modal/ConfirmModal.vue";
import { ErrorHandler } from "@/api/error/ErrorHandler";
import { InputFields } from "@/types/fields/InputFields";
import { InputFieldUtil } from "@/util/InputFieldUtil";
import { ArrayUtil } from "@/util/ArrayUtil";

@Component({
    components: { ErrorPlaceholder, LocationRatingCard },
})
export default class LocationRatings extends Vue {
    @Prop()
    secretId: string;

    /**
     * Ratings for the given location.
     */
    ratings = RequestHandler.handle(RatingService.getAll(this.secretId), {
        id: "ratings",
        style: "SECTION",
    });

    /**
     * Open the create rating modal.
     */
    openCreateRating() {
        this.$store.dispatch("modal/open", {
            component: () =>
                import(
                    "@/components/modal/location/rating/RatingActionModal.vue"
                ),
            componentPayload: {
                secretId: this.secretId,
                action: (fields: InputFields, instance: Vue) => {
                    instance.$set(instance, "loading", true);

                    RatingService.create(
                        this.secretId,
                        InputFieldUtil.getValues(fields)
                    )
                        .then((rating) => {
                            this.$store.dispatch("snackbar/open", {
                                message: "Review was successfully created",
                                color: "success",
                            });

                            // Close the modal.
                            this.$store.dispatch("modal/close");

                            // Add the rating at top of the ratings list.
                            if (this.ratings.isSuccess()) {
                                this.ratings.requireData().unshift(rating);
                            }
                        })
                        .catch((error) =>
                            ErrorHandler.handle(
                                error,
                                {
                                    id: "ratingCreate",
                                    style: "SNACKBAR",
                                },
                                fields
                            )
                        )
                        .finally(() =>
                            instance.$set(instance, "loading", false)
                        );
                },
            },
        });
    }

    /**
     * Open the modify rating modal.
     */
    openModifyRating(rating: Rating) {
        this.$store.dispatch("modal/open", {
            component: () =>
                import(
                    "@/components/modal/location/rating/RatingActionModal.vue"
                ),
            componentPayload: {
                secretId: this.secretId,
                rating,
                action: (fields: InputFields, instance: Vue) => {
                    instance.$set(instance, "loading", true);

                    RatingService.update(
                        rating.id,
                        InputFieldUtil.getValues(fields)
                    )
                        .then(() => {
                            this.$store.dispatch("snackbar/open", {
                                message: "Review was successfully updated.",
                                color: "success",
                            });

                            // Close the modal.
                            this.$store.dispatch("modal/close");

                            // Add the rating at top of the ratings list.
                            if (this.ratings.isSuccess()) {
                                // Update the rating.
                                rating.rating = fields["rating"]
                                    .value as number;
                                rating.message = fields["message"]
                                    .value as string;
                            }
                        })
                        .catch((error) =>
                            ErrorHandler.handle(
                                error,
                                {
                                    id: "ratingModify",
                                    style: "SNACKBAR",
                                },
                                fields
                            )
                        )
                        .finally(() =>
                            instance.$set(instance, "loading", false)
                        );
                },
            },
        });
    }

    /**
     * Open a model to confirm the delete of a rating.
     */
    openDeleteRating(rating: Rating) {
        this.$store.dispatch("modal/open", {
            component: ConfirmModal,
            componentPayload: {
                message: `Are you sure you want to delete this rating? This action is permanent and cannot be undone!'`,
                action: () =>
                    RatingService.delete(rating.id)
                        .then(() => {
                            // Close the modal.
                            this.$store.dispatch("modal/close");

                            // Remove the rating from the ratings table
                            if (this.ratings.isSuccess()) {
                                ArrayUtil.delete(
                                    this.ratings.requireData(),
                                    rating
                                );
                            }

                            // Send confirmation message.
                            this.$store.dispatch("snackbar/open", {
                                message: "Rating has been deleted",
                                color: "success",
                            });
                        })
                        .catch((error) => {
                            ErrorHandler.handle(error, {
                                style: "SNACKBAR",
                                id: "ratingDelete",
                            });
                        }),
            },
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
