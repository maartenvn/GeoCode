<template>
    <v-card>
        <v-card-title>
            Are you sure?

            <v-spacer />

            <v-btn icon @click="close">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-card-title>

        <v-card-text v-html="payload.message" />

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
                :disabled="loading"
                :loading="loading"
            >
                Confirm
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ConfirmModal extends Vue {
    /**
     * Payload, passed when opening the modal.
     */
    @Prop()
    payload: {
        message: string;
        action: (instance: Vue) => void;
    };

    /**
     * If the confirm model is loading.
     */
    loading = false;

    /**
     * Close the modal.
     */
    close() {
        this.$store.dispatch("modal/close");
    }

    /**
     * Execute the confirm action.
     */
    async confirm() {
        this.payload.action(this);
    }
}
</script>
