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

@Component({
    components: { ErrorPlaceholder, LocationRatingCard }
})
export default class LocationRatings extends Vue {
    @Prop()
    secretId: string;

    /**
     * Ratings for the given location.
     */
    ratings = RequestHandler.handle(RatingService.getAll(this.secretId), {
        id: "ratings",
        style: "SECTION"
    });

    /**
     * Open the create rating modal.
     */
    openCreateRating() {
        this.$store.dispatch("modal/open", {
            component: () =>
                import(
                    "@/components/modal/location/rating/RatingCreateModal.vue"
                ),
            componentPayload: {
                secretId: this.secretId,
                action: (rating: Rating) => {
                    if (this.ratings.isSuccess()) {
                        this.ratings.requireData().unshift(rating);
                    }
                }
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
