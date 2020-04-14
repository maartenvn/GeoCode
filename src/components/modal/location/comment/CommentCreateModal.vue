<template>
    <div>
        <v-card-title>
            Leave a message

            <v-spacer />

            <v-btn icon @click="close">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-card-title>

        <v-card-text>
            <p>
                Leave a message at this location.
            </p>

            <v-form>
                <!-- Message -->
                <v-textarea
                    v-model="fields.message.value"
                    :error-messages="fields.message.error"
                    :rules="fields.message.rules"
                    :disabled="loading"
                    label="Message"
                    placeholder="Leave a message"
                    outlined
                />
            </v-form>
        </v-card-text>

        <v-card-actions>
            <v-spacer />

            <!-- Cancel -->
            <v-btn color="error" text @click="close">
                Cancel
            </v-btn>

            <!-- Confirm -->
            <v-btn
                color="primary"
                depressed
                @click="create"
                :loading="loading"
                :disabled="loading"
            >
                Confirm
            </v-btn>
        </v-card-actions>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { InputField } from "@/types/fields/InputField";
import { InputFieldUtil } from "@/util/InputFieldUtil";
import { ErrorHandler } from "@/api/error/ErrorHandler";
import CommentService from "@/api/services/CommentService";
import Comment from "@/api/models/Comment";

@Component
export default class CommentCreateModal extends Vue {
    /**
     * Payload, passed when opening the modal.
     */
    @Prop()
    payload: { secretId: string; action: (comment: Comment) => void };

    /**
     * If the modal is loading.
     */
    loading = false;

    /**
     * Input Fields
     */
    fields = {
        message: new InputField()
    };

    /**
     * Create the comment
     */
    async create() {
        this.loading = true;

        CommentService.create(
            this.payload.secretId,
            InputFieldUtil.getValues(this.fields)
        )
            .then(comment => {
                this.$store.dispatch("snackbar/open", {
                    message: "Message was successfully created",
                    color: "success"
                });

                // Close the modal.
                this.$store.dispatch("modal/close");

                // Execute the given action.
                this.payload.action(comment);
            })
            .catch(error =>
                ErrorHandler.handle(
                    error,
                    {
                        id: "commentCreate",
                        style: "SNACKBAR"
                    },
                    this.fields
                )
            )
            .finally(() => (this.loading = false));
    }

    /**
     * Close the modal.
     */
    close() {
        this.$store.dispatch("modal/close");
    }
}
</script>
