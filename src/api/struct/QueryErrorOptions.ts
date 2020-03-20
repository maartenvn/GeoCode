import CustomErrorMessage from "./CustomErrorMessage";

export default class QueryErrorOptions {
    /**
     * Identifier of the error.
     * Has to be unique for every error.
     * This way we can display multiple errors on 1 page.
     */
    public id: string;

    /**
     * Way to display the error on screen.
     */
    public style: "SNACKBAR" | "CARD" | "SECTION" | "NONE";

    /**
     * Should the error be displayed on a seperate page.
     * This will keep the route of the current page but will remove all the router view contents.
     */
    public displayFullpage?: boolean;

    /**
     * Should the error be logged to the console.
     */
    public displayConsole?: boolean;

    /**
     * Should the error stacktrace be displayed.
     */
    public displayStacktrace?: boolean;

    /**
     * List with custom error messages for a specific HTTP status code.
     */
    public customMessages?: Array<CustomErrorMessage>;
}
