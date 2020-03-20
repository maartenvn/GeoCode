import Vue from "vue";
import CustomErrorMessage from "./struct/CustomErrorMessage";
import QueryError from "./struct/QueryError";
import QueryErrorOptions from "./struct/QueryErrorOptions";
import ErrorComponentBinding from "./error/ErrorComponentBinding";
import ErrorBus from "./error/ErrorBus";
import ErrorCard from "@/components/error/ErrorCard.vue";
import ErrorSection from "@/components/error/ErrorSection.vue";
import store from "@/store/store";
import router from "@/plugins/router";

/**
 * List with custom error messages for certain response codes/messages
 */
const globalCustomErrors: Array<CustomErrorMessage> = [
    {
        code: "401",
        message: "You are not logged in",
        description:
            "You are currently nog logged in. Please login and try again!"
    },
    {
        code: "404",
        message: "Page not found",
        description:
            "We cannot find the page you are looking for. The page is no longer available or was moved to a different location."
    },

    {
        code: "500",
        message: "Internal server error.",
        description:
            "We are having issues with the server. Please try again later."
    },

    {
        code: "network_error",
        message: "Unable to connect to server",
        description:
            "We are unable to connect to the server to retreive information. Please check if you have a valid internet connection & try again later."
    }
];

export default class ErrorHandler {
    /**
     * Handle every error that is pushed onto the errorbus.
     * @param binding Binding that will be used to update the component when an error occurs.
     */
    static handle(binding: ErrorComponentBinding): void {
        ErrorBus.$on(
            "error",
            (value: QueryError, options: QueryErrorOptions) => {
                const payload = { value, options };

                const customErrors =
                    options.customMessages !== undefined
                        ? [...options.customMessages, ...globalCustomErrors]
                        : globalCustomErrors;

                // Ajust some errors that can be displayed better based on the given error code.
                const customError = customErrors.find(
                    e => e.code == value.code
                );

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

                // SECTION
                else if (options.style === "SECTION") {
                    component = ErrorSection;
                }

                // SNACKBAR
                // Snackbars are not rendered, they are displayed using the snackbar API.
                if (options.style == "SNACKBAR") {
                    store.dispatch("snackbar/open", {
                        message: payload.value.message,
                        color: "error"
                    });
                }

                Vue.set(binding, "component", component);
                Vue.set(binding, "payload", payload);
            }
        );

        // Clear the error when navigating to a different route.
        router.beforeEach((to, from, next) => {
            Vue.set(binding, "component", false);
            Vue.set(binding, "payload", null);

            next();
        });
    }
}
