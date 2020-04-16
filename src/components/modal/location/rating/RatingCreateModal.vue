<template>
    <div>
        <v-card-title>
            Leave a review

            <v-spacer />

            <v-btn icon @click="close">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-card-title>

        <v-card-text>
            <p>
                Leave a review at this location.
            </p>

            <v-form>
                <!-- Rating -->
                <div class="pt-2 pb-7">
                    <label class="pb-4">Rating</label>

                    <v-rating
                        v-model="fields.rating.value"
                        color="primary"
                        background-color="primary"
                        :readonly="loading"
                        hover
                        dense
                    />
                </div>

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
import RatingService from "@/api/services/RatingService";
import { InputFieldUtil } from "@/util/InputFieldUtil";
import { ErrorHandler } from "@/api/error/ErrorHandler";
import Rating from "@/api/models/Rating";

@Component
export default class RatingCreateModal extends Vue {
    /**
     * Payload, passed when opening the modal.
     */
    @Prop()
    payload: { secretId: string; action: (rating: Rating) => void };

    /**
     * If the modal is loading.
     */
    loading = false;

    /**
     * Input Fields
     */
    fields = {
        rating: new InputField({ value: 0 }),
        message: new InputField(),
    };

    /**
     * Create the rating
     */
    async create() {
        this.loading = true;

        RatingService.create(
            this.payload.secretId,
            InputFieldUtil.getValues(this.fields)
        )
            .then((rating) => {
                this.$store.dispatch("snackbar/open", {
                    message: "Review was successfully created",
                    color: "success",
                });

                // Close the modal.
                this.$store.dispatch("modal/close");

                // Execute the given action.
                this.payload.action(rating);
            })
            .catch((error) =>
                ErrorHandler.handle(
                    error,
                    {
                        id: "ratingCreate",
                        style: "SNACKBAR",
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
