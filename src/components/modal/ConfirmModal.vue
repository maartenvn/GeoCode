<template>
    <v-card>
        <v-card-title>
            Are you sure?

            <v-spacer />

            <v-btn icon @click="close">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-card-title>

        <v-card-text>
            {{ payload.message }}
        </v-card-text>

        <v-card-actions>
            <v-spacer />

            <!-- Cancel -->
            <v-btn color="error" text @click="close">
                Cancel
            </v-btn>

            <!-- Confirm -->
            <v-btn color="primary" depressed @click="payload.action">
                Confirm
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class ConfirmModal extends Vue {
    /**
     * Payload, passed when opening the modal.
     */
    @Prop()
    payload: { message: string; action: Function };

    /**
     * Close the modal.
     */
    close() {
        this.$store.dispatch("modal/close");
    }
}
</script>
