<template>
    <v-card class="error-card">
        <!-- Message -->
        <v-card-title class="error-card__message">
            {{ payload.value.message }}
        </v-card-title>

        <!-- Description -->
        <v-card-text class="error-card__description">
            {{ payload.value.description }}
        </v-card-text>
    </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { ErrorValue, ErrorOptions } from "../../util/error/errormixin";
import { ErrorPayload } from "../../util/error/errorhandler";

@Component
export default class ErrorCard extends Vue {
    /**
     * Payload of the error.
     */
    @Prop()
    payload: ErrorPayload;
}
</script>

<style lang="scss" scoped>
.error-card {
    &__image {
        display: block;
        height: 120px;
        margin: auto;
        padding: 10px 0px 10px 0px;
    }

    &__message {
        font-size: 1.9em;
        padding-bottom: 20px;
    }

    &__description {
        font-size: 1.1em;
    }
}
</style>
