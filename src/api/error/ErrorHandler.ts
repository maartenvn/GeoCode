import Vue from "vue";
import { EchoError } from "echofetch";
import { CustomErrorOptions } from "@/api/error/types/CustomErrorOptions";
import ErrorBus from "@/api/error/ErrorBus";
import { CustomErrorMessage } from "@/api/error/types/CustomErrorMessage";
import { InputFields } from "@/types/fields/InputFields";
import { InputFieldError } from "@/types/fields/InputFieldError";
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
            "We are unable to connect to the server to retrieve information. Please check if you have a valid internet connection & try again later."
    }
];

export class ErrorHandler {
    /**
     * Handle an error, received from a fetch.
     * @param echoError
     */
    static handle(
        error: EchoError,
        options: CustomErrorOptions,
        fields: InputFields = {}
    ) {
        // Handle field errors.
        this.handleInputFields(error, fields);

        // Handle general errors.
        this.handleGeneral(error);

        // Emit the error on the ErrorBus.
        ErrorBus.$emit("error", error, options);

        // Clear the error when navigating to a different route.
        router.beforeEach((to, from, next) => {
            ErrorBus.$emit("error-clear");

            next();
        });
    }

    /**
     * Handle the error for the given InputFields.
     * This will add an error to every given field with errors.
     * @param error
     * @param fields
     */
    static handleInputFields(error: EchoError, fields: InputFields) {
        // Check if the input errors are undefined.
        if (
            !error ||
            !error.response ||
            !error.response.data ||
            !error.response.data.inputErrors
        ) {
            return;
        }

        const inputErrors = error.response.data.inputErrors;

        // Set the error messages for every field.
        for (const fieldName of Object.keys(fields)) {
            const fieldValue = fields[fieldName];
            const fieldNewError = inputErrors.find(
                (inputError: InputFieldError) => inputError.field === fieldName
            );

            // Set the new error message, when available.
            if (fieldNewError) {
                fieldValue.error = fieldNewError.message;
            }

            // Otherwise set an empty error. (necessary for reset of previous error)
            else {
                fieldValue.error = "";
            }
        }
    }

    /**
     * Handle general errors.
     * This will modify the error to the first given "generalError" message
     * @param error
     */
    static handleGeneral(error: EchoError) {
        // Check if the general errors are undefined.
        if (
            !error ||
            !error.response ||
            !error.response.data ||
            !error.response.data.generalErrors
        ) {
            return;
        }

        const generalErrors = error.response.data.generalErrors;

        // Check if any general error was found.
        if (generalErrors.length > 0) {
            // Modify the error message to contain the first general error.
            error.message = generalErrors[0].message;
        }
    }

    /**
     * Get the custom error message for a given error.
     * @param error
     * @param options
     */
    static getCustomMessage(
        error: EchoError,
        options: CustomErrorOptions
    ): string {
        const customError = this.getCustomError(error, options);

        return customError ? customError.message : error.message;
    }

    /**
     * Get the custom error message for a given error.
     * @param error
     * @param options
     */
    static getCustomDescription(
        error: EchoError,
        options: CustomErrorOptions
    ): string {
        const customError = this.getCustomError(error, options);

        return customError ? customError.description : "";
    }

    /**
     * Get the custom error message for a given error, or undefined when not given.
     * @param error
     * @param options
     */
    private static getCustomError(
        error: EchoError,
        options: CustomErrorOptions
    ): CustomErrorMessage | undefined {
        if (!error) {
            return undefined;
        }

        // Ajust some errors that can be displayed better based on the given error code.
        const customError = this.getCustomErrors(options).find(
            e =>
                (error.response &&
                    e.code === error.response?.status.toString()) ||
                e.code === error.code
        );

        return customError;
    }

    /**
     * Get a list with custom error messages based on global custom messages & given error options
     * @param options
     */
    private static getCustomErrors(
        options: CustomErrorOptions
    ): Array<CustomErrorMessage> {
        return options.customMessages !== undefined
            ? [...options.customMessages, ...globalCustomErrors]
            : globalCustomErrors;
    }
}
