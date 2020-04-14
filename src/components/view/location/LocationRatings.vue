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
                <location-ratings-card
                    v-for="index in 3"
                    :key="index"
                    :loading="true"
                />
            </template>

            <!-- Data -->
            <template v-else-if="ratings.isSuccess()">
                <location-ratings-card
                    v-for="index in 3"
                    :key="index"
                    :loading="true"
                />
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
import LocationRatingsCard from "@/components/view/location/rating/LocationRatingsCard.vue";
import RatingService from "@/api/services/RatingService";
import Rating from "@/api/models/Rating";
import ErrorPlaceholder from "@/components/error/ErrorPlaceholder.vue";

@Component({
    components: { ErrorPlaceholder, LocationRatingsCard }
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
