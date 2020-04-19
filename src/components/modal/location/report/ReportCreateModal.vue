<template>
    <div>
        <v-card-title>
            Report this location

            <v-spacer />

            <v-btn icon @click="close">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-card-title>

        <v-card-text>
            <p>
                Report this location.
            </p>

            <v-form>
                <!-- Reason -->
                <v-select
                    v-model="fields.reason.value"
                    :error-messages="fields.reason.error"
                    :rules="fields.reason.rules"
                    :items="reasons"
                    label="Reason"
                    outlined
                />

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

                <!-- Image -->
                <v-file-input
                    v-model="imageField.value"
                    accept="image/*"
                    label="Optional image"
                    prepend-icon="mdi-image"
                    :show-size="1000"
                    outlined
                >
                    <template v-slot:selection="{ index, text }">
                        <v-chip color="primary" dark label small>
                            {{ text }}
                        </v-chip>
                    </template>
                </v-file-input>
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
                @click="confirm"
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
import Rating from "@/api/models/Rating";
import { InputFields } from "@/types/fields/InputFields";

@Component
export default class ReportCreateModal extends Vue {
    /**
     * Payload, passed when opening the modal.
     */
    @Prop()
    payload: {
        secretId: string;
        rating: Rating;
        action: (fields: InputFields, image: InputField, instance: Vue) => void;
    };

    /**
     * If the modal is loading.
     */
    loading = false;

    /**
     * Reasons for a report.
     */
    reasons = [
        "Spam",
        "Inappropriate content",
        "Damaged QR-code",
        "Invalid location",
    ];

    /**
     * Input Fields
     */
    fields = {
        reason: new InputField(),
        message: new InputField(),
    };

    /**
     * Image field for selecting an image.
     * This is seperate from "fields" because it is not passed to the patch function.
     */
    imageField = new InputField({ value: null });

    /**
     * Execute the given action.
     */
    confirm() {
        this.payload.action(this.fields, this.imageField, this);
    }

    /**
     * Close the modal.
     */
    close() {
        this.$store.dispatch("modal/close");
    }
}
</script>
