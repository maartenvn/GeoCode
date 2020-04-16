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
                            <div class="comment__username">
                                <template v-if="creator.isLoading()">
                                    <v-skeleton-loader dense type="text" />
                                </template>

                                <template v-else-if="creator.isSuccess()">
                                    {{ creator.data.username }}
                                </template>
                            </div>
                        </v-row>

                        <v-row class="comment__message" no-gutters>
                            {{ comment.message }}
                        </v-row>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>

        <!-- Error -->
        <error-placeholder v-else-if="creator.isError()" id="commentCreator" />
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
import Comment from "@/api/models/Comment";

@Component({
    components: { ErrorPlaceholder },
})
export default class LocationCommentCard extends Vue {
    /**
     * If in loading state.
     */
    @Prop({ default: false })
    loading: boolean;

    /**
     * Comment for the card to display
     */
    @Prop()
    comment: Comment;

    /**
     * Get the user for the comment.
     */
    creator: EchoPromise<User>;

    constructor() {
        super();

        if (!this.loading) {
            this.creator = RequestHandler.handle(
                UsersService.get(this.comment.creator.id),
                {
                    id: "commentCreator",
                    style: "CARD",
                }
            );
        }
    }
}
</script>

<style lang="scss">
.comment {
    &__username {
        font-size: 1.1em;
        font-weight: bold;
    }
}
</style>
