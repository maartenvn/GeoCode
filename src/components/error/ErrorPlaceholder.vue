<template>
    <div>
        <!-- Fullpage error -->
        <v-container v-if="displayFullPage && renderError">
            <v-row justify="center">
                <v-col cols="12" md="6">
                    <component
                        v-if="renderError"
                        :is="errorComponent"
                        :payload="errorComponentPayload"
                    />
                </v-col>
            </v-row>
        </v-container>

        <!-- Regular error -->
        <div v-else>
            <component
                v-if="renderError"
                :is="errorComponent"
                :payload="errorComponentPayload"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { EchoError } from "echofetch";
import { CustomErrorOptions } from "@/api/error/types/CustomErrorOptions";
import { ErrorComponentPayload } from "@/api/error/types/component/ErrorComponentPayload";
import ErrorBus from "@/api/error/ErrorBus";
import ErrorCard from "@/components/error/placeholders/ErrorCard.vue";
import ErrorSection from "@/components/error/placeholders/ErrorSection.vue";
import { ErrorHandler } from "@/api/error/ErrorHandler";

@Component
export default class ErrorHandlerComponent extends Vue {
    /**
     * Identifier of the error that should be displayed.
     * All errors with the given identifier will be displayed.
     */
    @Prop()
    errorId: string;

    /**
     * If the error should be displayed when "displayFullPage" is true.
     */
    @Prop({ default: false })
    displayFullPage: boolean;

    /**
     * Should the error component be rendered.
     */
    renderError = false;

    /**
     *  Component to display when an error occurs.
     */
    errorComponent: unknown;

    /**
     * Payload to pass to the error component.
     */
    errorComponentPayload: ErrorComponentPayload;

    created() {
        // Create a listener that will show an error when it is spawned.
        ErrorBus.$on(
            "error",
            (error: EchoError, options: CustomErrorOptions) => {
                // Check if the error should be rendered.
                if (
                    options.id === this.errorId ||
                    (this.displayFullPage && options.displayFullpage)
                ) {
                    // Get the component to display for the error.
                    if (options.style === "CARD") {
                        this.errorComponent = ErrorCard;
                    } else if (options.style === "SECTION") {
                        this.errorComponent = ErrorSection;
                    }

                    // Apply the custom error messages to the error object.
                    error.message = ErrorHandler.getCustomMessage(
                        error,
                        options
                    );

                    this.errorComponentPayload = {
                        error,
                        description: ErrorHandler.getCustomDescription(
                            error,
                            options
                        ),
                        options
                    };

                    this.renderError = true;
                }
            }
        );

        // Clear the error when a "error-clear" event is send.
        ErrorBus.$on("error-clear", () => {
            this.renderError = false;
        });
    }
}
</script>
