import QueryError from "../struct/QueryError";
import QueryErrorOptions from "../struct/QueryErrorOptions";

/**
 * Payload that will be passed to the component specified in the error component binding.
 */
export default class ErrorComponentPayload {
    /**
     * Error Value
     */
    public value: QueryError;

    /**
     * Error Options
     */
    public options: QueryErrorOptions;
}
