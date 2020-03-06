import { Component, Vue } from "vue-property-decorator";
import ErrorBus from "./errorbus";

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
    public style: "SNACKBAR" | "CARD" | "SECTION";

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
}

@Component
export default class ErrorMixin extends Vue {
    /**
     * Display an error message that will notify the user of an error.
     */
    $error(value: ErrorValue, options: ErrorOptions) {
        ErrorBus.$emit("error", value, options);
    }
}
