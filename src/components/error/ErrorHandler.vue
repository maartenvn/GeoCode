<template>
    <component
        v-if="renderError"
        :is="errorBinding.component"
        :payload="errorBinding.payload"
    />
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { handleError } from "@/util/error/errorhandler";
import { ErrorComponentBinding } from "../../util/error/error";

@Component
export default class ErrorHandler extends Vue {
    /**
     * Identifier of the error that should be displayed.
     * All errors with the given identiefier will be displayed.
     */
    @Prop()
    errorId: string;

    /**
     * Error Component binding used for rendering the error component.
     */
    errorBinding: ErrorComponentBinding;

    constructor() {
        super();

        this.errorBinding = new ErrorComponentBinding();
    }

    created() {
        // Create a listener that will update the error component binding when an error occurs.
        handleError(this.errorBinding);
    }

    /**
     * Should the given error be rendered.
     *
     * If the given identifier equals the identifier of the error.
     */
    get renderError(): boolean {
        return (
            this.errorBinding &&
            this.errorBinding.component &&
            this.errorBinding.payload &&
            this.errorBinding.payload.options &&
            this.errorBinding.payload.options.id === this.errorId
        );
    }
}
</script>
