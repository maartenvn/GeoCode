export class CustomErrorMessage {
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
