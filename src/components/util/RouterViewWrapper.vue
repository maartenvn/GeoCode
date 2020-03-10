<template>
    <!-- Error Component -->
    <v-container v-if="renderError">
        <v-row justify="center">
            <v-col cols="12" md="6">
                <component
                    :is="errorBinding.component"
                    :payload="errorBinding.payload"
                />
            </v-col>
        </v-row>
    </v-container>

    <!-- Router view -->
    <router-view v-else />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { handleError, ErrorComponentBinding } from "@/util/error/errorhandler";

@Component
export default class RouterViewWrapper extends Vue {
    /**
     * Error Component binding used for rendering the error component.
     */
    errorBinding: ErrorComponentBinding;

    constructor() {
        super();

        this.errorBinding = new ErrorComponentBinding();
    }

    created() {
        handleError(this.errorBinding);
    }

    /**
     * If the given error should be rendered or not.
     *
     * Check if there is an error & also check if the error should be displayed in full page.
     */
    get renderError(): boolean {
        return (
            this.errorBinding.component &&
            this.errorBinding.payload &&
            this.errorBinding.payload.options &&
            this.errorBinding.payload.options.displayFullpage !== undefined &&
            this.errorBinding.payload.options.displayFullpage
        );
    }
}
</script>
