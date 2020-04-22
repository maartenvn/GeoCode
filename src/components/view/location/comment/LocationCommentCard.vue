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
                            <v-avatar :color="!avatarUrl ? 'primary' : ''">
                                <img
                                    v-if="avatarUrl"
                                    :src="avatarUrl"
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
                            <div class="comment__username">
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
                        </v-row>

                        <v-row class="comment__message" no-gutters>
                            {{ comment.message }}
                        </v-row>
                    </v-col>
                </v-row>

                <!-- Delete -->
                <v-row v-if="isOwner" no-gutters justify="end">
                    <v-col cols="auto">
                        <v-btn icon @click="modifyAction">
                            <v-icon>
                                mdi-pencil
                            </v-icon>
                        </v-btn>
                    </v-col>

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
        <error-placeholder v-else-if="creator.isError()" id="commentCreator" />
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { RequestHandler } from "@/api/RequestHandler";
import { EchoPromise } from "echofetch";
import ErrorPlaceholder from "@/components/error/ErrorPlaceholder.vue";
import UsersService from "@/api/services/UsersService";
import User from "@/api/models/User";
import { StoreGetter } from "@/store/decorators/StoreGetterDecorator";
import { Event } from "@/util/decorators/EventDecorator";
import Comment from "@/api/models/Comment";
import { UserUtil } from "@/util/UserUtil";

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
     * Get the user for the rating.
     */
    creator?: EchoPromise<User> | null = null;

    /**
     * Get the current logged in user.
     */
    @StoreGetter("session/currentUser")
    currentUser: EchoPromise<User>;

    /**
     * Action when the delete button is pressed.
     */
    @Event()
    deleteAction: (comment: Comment) => void;

    /**
     * Action when the modify button is pressed.
     */
    @Event()
    modifyAction: (comment: Comment) => void;

    /**
     * Updating is done in a watcher to handle potential lazy loading.
     */
    @Watch("comment", { immediate: true })
    onLoadingChange() {
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
     * Get the avatar URL for the creator
     */
    get avatarUrl() {
        if (this.creator?.isSuccess()) {
            return UserUtil.getAvatarUrl(this.creator.requireData());
        }

        return "";
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
