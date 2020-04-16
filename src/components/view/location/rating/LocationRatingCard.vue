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
                        <!-- Loading -->
                        <template v-if="creator.isLoading()">
                            <v-skeleton-loader type="avatar" />
                        </template>

                        <!-- Data -->
                        <template v-else-if="creator.isSuccess()">
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
                        </template>
                    </v-col>

                    <v-col>
                        <v-row class="pb-2" no-gutters>
                            <div class="rating__username">
                                <!-- Loading -->
                                <template v-if="creator.isLoading()">
                                    <v-skeleton-loader
                                        dense
                                        type="text"
                                        width="150"
                                    />
                                </template>

                                <!-- Data -->
                                <template v-else-if="creator.isSuccess()">
                                    {{ creator.data.username }}
                                </template>
                            </div>

                            <v-spacer />

                            <v-rating
                                color="primary"
                                background-color="primary"
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
                        <v-btn color="error" icon @click="deleteAction">
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
import { Event } from "@/util/decorators/EventDecorator";

@Component({
    components: { ErrorPlaceholder },
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

    @Event()
    deleteAction: (rating: Rating) => void;

    constructor() {
        super();

        if (!this.loading) {
            this.creator = RequestHandler.handle(
                UsersService.get(this.rating.creator.id),
                {
                    id: "ratingCreator",
                    style: "CARD",
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
