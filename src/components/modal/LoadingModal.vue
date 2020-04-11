<template>
    <v-card class="loading-modal" flat>
        <v-card-title>
            Loading...

            <v-spacer />

            <v-btn icon @click="close">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-card-title>

        <v-card-text class="loading-modal__content">
            <v-progress-circular :size="100" color="primary" indeterminate />
        </v-card-text>
    </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class LoadingModal extends Vue {
    /**
     * Close the modal.
     */
    close() {
        this.$store.dispatch("modal/close");
    }
}
</script>

<style lang="scss" scoped>
.loading-modal {
    overflow: hidden;

    &__content {
        display: flex;
        justify-content: center;
        margin-top: 50px;
        margin-bottom: 50px;
    }
}
</style>
