<template>
    <v-card>
        <v-card-title>
            {{ payload.title }}

            <v-spacer />

            <v-btn icon @click="close">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-card-title>

        <v-card-text v-html="payload.message" />

        <v-card-actions>
            <v-spacer />

            <!-- Ok -->
            <v-btn color="primary" depressed @click="close">
                Ok
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ErrorModal extends Vue {
    /**
     * Payload, passed when opening the modal.
     */
    @Prop()
    payload: {
        title: string;
        message: string;
    };

    /**
     * Close the modal.
     */
    close() {
        this.$store.dispatch("modal/close");
    }
}
</script>
