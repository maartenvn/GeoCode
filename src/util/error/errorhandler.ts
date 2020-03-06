import Vue from "vue";
import { Component } from "vue";
import { ErrorValue, ErrorOptions } from "./errormixin";
import ErrorBus from "./errorbus";
import ErrorCard from "@/components/error/ErrorCard.vue";
import ErrorSection from "@/components/error/ErrorSection.vue";
import ErrorSnackbar from "@/components/error/ErrorSnackbar.vue";
import Router from "@/plugins/router";

/**
 * Component that will be used to update & pass error components & payload to another Vue component.
 */
export class ErrorComponentBinding {
    // Component to render when an error occurs.
    public component: Component;

    // Payload to pass to the component.
    public payload: ErrorPayload;
}

/**
 * Payload that will be passed to the component specified in the error component binding.
 */
export class ErrorPayload {
    // Error value
    public value: ErrorValue;

    // Error options
    public options: ErrorOptions;
}

/**
 * List with custom error messages for certain response codes/messages
 */
const customErrors: Array<any> = [
    {
        code: "404",
        message: "Page not found",
        description:
            "We cannot find the page you are looking for. The page is no longer available or was moved to a different location."
    },

    {
        code: "network_error",
        message: "Unable to connect to server",
        description:
            "We are unable to connect to the server to retreive information. Please check if you have a valid internet connection & try again later."
    }
];

/**
 * Handle every error that is pushed onto the errorbus.
 * @param binding Binding that will be used to update the component when an error occurs.
 */
export function handleError(binding: ErrorComponentBinding): void {
    ErrorBus.$on("error", (value: ErrorValue, options: ErrorOptions) => {
        const payload = { value, options };

        // Ajust some errors that can be displayed better based on the given error code.
        const customError = customErrors.find(e => e.code === value.code);

        if (customError) {
            payload.value.message = customError.message;
            payload.value.description = customError.description;
        }

        // Select which component should be rendered.
        let component;

        // CARD
        if (options.style === "CARD") {
            component = ErrorCard;
        }

        // SNACKBAR
        else if (options.style === "SNACKBAR") {
            component = ErrorSnackbar;
        }

        // SECTION
        else if (options.style === "SECTION") {
            component = ErrorSection;
        }

        Vue.set(binding, "component", component);
        Vue.set(binding, "payload", payload);
    });

    // Clear the error when navigating to a different route.
    Router.beforeEach((to, from, next) => {
        Vue.set(binding, "component", false);
        Vue.set(binding, "payload", null);

        next();
    });
}
