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
import LocationCommentCard from "@/components/view/location/guestbook/LocationCommentCard.vue";
import Comment from "@/api/models/Comment";

@Component({
    components: { LocationCommentCard, ErrorPlaceholder }
})
export default class LocationGuestbook extends Vue {
    @Prop()
    secretId: string;

    /**
     * Comments for the given location.
     */
    comments = RequestHandler.handle(CommentService.getAll(this.secretId), {
        id: "comments",
        style: "SECTION"
    });

    /**
     * Open the create comment modal.
     */
    openCreateComment() {
        this.$store.dispatch("modal/open", {
            component: () =>
                import(
                    "@/components/modal/location/rating/RatingCreateModal.vue"
                ),
            componentPayload: {
                secretId: this.secretId,
                action: (comment: Comment) => {
                    if (this.comments.isSuccess()) {
                        this.comments.requireData().unshift(comment);
                    }
                }
            }
        });
    }
}
</script>
