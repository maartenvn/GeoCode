import { EchoError, EchoPromise } from "echofetch";
import { CustomErrorOptions } from "@/api/error/types/CustomErrorOptions";
import { ErrorHandler } from "@/api/error/ErrorHandler";

export class RequestHandler {
    /**
     * Handle a request.
     * @param request
     * @param errorOptions
     */
    static handle<T>(
        request: EchoPromise<T>,
        errorOptions: CustomErrorOptions
    ): EchoPromise<T> {
        // Handle the error when it occurs.
        request.getPromise().catch((error: EchoError) => {
            ErrorHandler.handle(error, errorOptions);
        });

        return request;
    }
}
