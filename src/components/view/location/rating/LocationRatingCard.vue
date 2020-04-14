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
                        <v-avatar>
                            <img
                                src="https://assets.change.org/photos/6/yu/xm/phYUXmIiZEuPcns-800x450-noPad.jpg?1490797613"
                                :alt="creator.data.username"
                            />
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
