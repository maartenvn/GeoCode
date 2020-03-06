<template>
    <div class="error-section">
        <!-- Message -->
        <div class="error-section__message">
            {{ payload.value.message }}
        </div>

        <!-- Description -->
        <div class="error-section__description">
            {{ payload.value.description }}
        </div>
    </div>
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
.error-section {
    &__message {
        font-size: 1.9em;
        font-weight: 500;
        padding-bottom: 20px;
    }

    &__description {
        font-size: 1.1em;
    }
}
</style>
