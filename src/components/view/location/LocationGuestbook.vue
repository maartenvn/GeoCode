<template>
    <div class="section">
        <div class="section__title">
            Guestbook

            <v-spacer />

            <v-btn color="primary" text @click="openCreateComment">
                Leave a message
                <v-icon right>mdi-plus-circle-outline</v-icon>
            </v-btn>
        </div>

        <div class="section__content">
            <!-- Loading -->
            <template v-if="comments.isLoading()">
                <location-comment-card
                    v-for="index in 3"
                    :key="index"
                    :loading="true"
                />
            </template>

            <!-- Data -->
            <template v-else-if="comments.isSuccess()">
                <!-- Not Empty -->
                <template v-if="comments.data && comments.data.length > 0">
                    <location-comment-card
                        v-for="(comment, index) of comments.data"
                        :key="index"
                        :comment="comment"
                        @deleteAction="openDeleteComment(comment)"
                        @modifyAction="openModifyComment(comment)"
                    />
                </template>

                <!-- Empty -->
                <template v-else>
                    <div class="text-center mt-10">
                        <h3>No messages where found</h3>
                        <p>
                            Be the first one to leave a message! Click the
                            "leave a message"-button to leave a message!
                        </p>
                    </div>
                </template>
            </template>

            <!-- Error -->
            <template v-else>
                <error-placeholder error-id="comments" class="text-center" />
            </template>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { RequestHandler } from "@/api/RequestHandler";
import ErrorPlaceholder from "@/components/error/ErrorPlaceholder.vue";
import CommentService from "@/api/services/CommentService";
import LocationCommentCard from "@/components/view/location/comment/LocationCommentCard.vue";
import { InputFields } from "@/types/fields/InputFields";
import { InputFieldUtil } from "@/util/InputFieldUtil";
import { ErrorHandler } from "@/api/error/ErrorHandler";
import ConfirmModal from "@/components/modal/ConfirmModal.vue";
import { ArrayUtil } from "@/util/ArrayUtil";
import Comment from "@/api/models/Comment";

@Component({
    components: { LocationCommentCard, ErrorPlaceholder },
})
export default class LocationGuestbook extends Vue {
    @Prop()
    secretId: string;

    /**
     * Comments for the given location.
     */
    comments = RequestHandler.handle(CommentService.getAll(this.secretId), {
        id: "comments",
        style: "SECTION",
    });

    /**
     * Open the create comment modal.
     */
    openCreateComment() {
        this.$store.dispatch("modal/open", {
            component: () =>
                import(
                    "@/components/modal/location/comment/CommentActionModal.vue"
                ),
            componentPayload: {
                secretId: this.secretId,
                action: (fields: InputFields, instance: Vue) => {
                    instance.$set(instance, "loading", true);

                    CommentService.create(
                        this.secretId,
                        InputFieldUtil.getValues(fields)
                    )
                        .then((comment) => {
                            this.$store.dispatch("snackbar/open", {
                                message: "Message was successfully created",
                                color: "success",
                            });

                            // Close the modal.
                            this.$store.dispatch("modal/close");

                            // Add the comments at top of the comments list.
                            if (this.comments.isSuccess()) {
                                this.comments.requireData().unshift(comment);
                            }
                        })
                        .catch((error) =>
                            ErrorHandler.handle(
                                error,
                                {
                                    id: "commentCreate",
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
     * Open the modify comment modal.
     */
    openModifyComment(comment: Comment) {
        this.$store.dispatch("modal/open", {
            component: () =>
                import(
                    "@/components/modal/location/comment/CommentActionModal.vue"
                ),
            componentPayload: {
                secretId: this.secretId,
                comment,
                action: (fields: InputFields, instance: Vue) => {
                    instance.$set(instance, "loading", true);

                    CommentService.update(
                        comment.id,
                        InputFieldUtil.getValues(fields)
                    )
                        .then(() => {
                            this.$store.dispatch("snackbar/open", {
                                message: "Message was successfully updated.",
                                color: "success",
                            });

                            // Close the modal.
                            this.$store.dispatch("modal/close");

                            // Add the comment at top of the comments list.
                            if (this.comments.isSuccess()) {
                                // Update the comment.
                                comment.message = fields["message"]
                                    .value as string;
                            }
                        })
                        .catch((error) =>
                            ErrorHandler.handle(
                                error,
                                {
                                    id: "commentModify",
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
     * Open a model to comment the delete of a comment.
     */
    openDeleteComment(comment: Comment) {
        this.$store.dispatch("modal/open", {
            component: ConfirmModal,
            componentPayload: {
                message: `Are you sure you want to delete this message? This action is permanent and cannot be undone!'`,
                action: () =>
                    CommentService.delete(comment.id)
                        .then(() => {
                            // Close the modal.
                            this.$store.dispatch("modal/close");

                            // Remove the comment from the comments table
                            if (this.comments.isSuccess()) {
                                ArrayUtil.delete(
                                    this.comments.requireData(),
                                    comment
                                );
                            }

                            // Send confirmation message.
                            this.$store.dispatch("snackbar/open", {
                                message: "Message has been deleted",
                                color: "success",
                            });
                        })
                        .catch((error) => {
                            ErrorHandler.handle(error, {
                                style: "SNACKBAR",
                                id: "commentDelete",
                            });
                        }),
            },
        });
    }
}
</script>
