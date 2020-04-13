<template>
    <div>
        <!-- Error Component -->
        <error-placeholder :display-full-page="true" />

        <!-- Router view -->
        <router-view v-if="!hasError" />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ErrorPlaceholder from "@/components/error/ErrorPlaceholder.vue";
import ErrorBus from "@/api/error/ErrorBus";
import { EchoError } from "echofetch";
import { CustomErrorOptions } from "@/api/error/types/CustomErrorOptions";
import ErrorCard from "@/components/error/placeholders/ErrorCard.vue";
import ErrorSection from "@/components/error/placeholders/ErrorSection.vue";
import { ErrorHandler } from "@/api/error/ErrorHandler";

@Component({
    components: { ErrorPlaceholder }
})
export default class RouterViewWrapper extends Vue {
    /**
     * If the page has an error.
     */
    hasError = false;

    created() {
        // Create a listener that will show an error when it is spawned.
        ErrorBus.$on(
            "error",
            (error: EchoError, options: CustomErrorOptions) => {
                if (options.displayFullpage) {
                    this.hasError = true;
                }
            }
        );

        // Clear the error when a "error-clear" event is send.
        ErrorBus.$on("error-clear", () => {
            this.hasError = false;
        });
    }
}
</script>
