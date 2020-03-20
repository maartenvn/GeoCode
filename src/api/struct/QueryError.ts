import { AxiosResponse } from "axios";

export default class QueryError {
    /**
     * Message of the error to display.
     */
    public message: string;

    /**
     * Description of the error.
     */
    public description?: string;

    /**
     * Code of the error.
     */
    public code?: string;

    /**
     * Stacktrace of the error.
     */
    public stacktrace?: string;

    /**
     * Response data of the error.
     */
    public response?: any;
}
