import { Component } from "vue";

/**
 * The value of the error.
 */
export class ErrorValue {
    // Message of the error to display.
    public message: string;

    // Description of the error.
    public description?: string;

    // Code of the error.
    public code?: string;

    // Stacktrace of the error.
    public stacktrace?: string;
}

/**
 * Options for the error function.
 */
export class ErrorOptions {
    // Way to display the error on screen.
    public style: "SNACKBAR" | "CARD" | "SECTION" | "NONE";

    // Identifier of the error.
    // Has to be unique for every error.
    // This way we can display multiple errors on 1 page.
    public id: string;

    // Should the error be displayed on a seperate page.
    // This will keep the route of the current page but will remove all the router view contents.
    public displayFullpage?: boolean;

    // Should the error be logged to the console.
    public displayConsole?: boolean;

    // Should the error stacktrace be displayed.
    public displayStacktrace?: boolean;

    // List with custom error messages for a specific HTTP status code.
    public customMessages?: Array<ErrorCustomMessage>;
}

/**
 * Custom error message for a specific HTTP status code.
 */
export class ErrorCustomMessage {
    /**
     * HTTP status code.
     */
    public code: string;

    /**
     * Custom message to display when an error with the specified code occurs.
     */
    public message: string;

    /**
     * Custom description to display with the error message.
     */
    public description: string;
}

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
