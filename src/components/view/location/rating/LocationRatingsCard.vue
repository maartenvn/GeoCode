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
                                alt="John"
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

                            <v-rating :value="3" dense small readonly />
                        </v-row>

                        <v-row class="rating__comment" no-gutters>
                            (Barry is picking out a shirt) Yellow, black.
                            Yellow, black. Yellow, black. Yellow, black. Ooh,
                            black and yellow! Let's shake it up a little.
                        </v-row>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>

        <!-- Error -->
        <error-placeholder v-else-if="creator.isError()" id="rating" />
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
export default class LocationRatingsCard extends Vue {
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
                    id: "rating",
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
