import {
    EchoError,
    EchoRequest,
    EchoResponse,
    EchoServiceInterceptor,
} from "echofetch";
import { setupCache } from "axios-cache-adapter";

/**
 * Setup the cache.
 */
function setupCacheStore() {
    return setupCache({
        maxAge: 15 * 60 * 1000,
    });
}

// Create a cache for storing the network results.
let cache = setupCacheStore();

export class AuthInterceptor implements EchoServiceInterceptor {
    onRequest(request: EchoRequest): EchoRequest {
        // Send credentials with every request.
        request.withCredentials = true;

        // Clear the cache when logging out.
        // Clear the cache when deleting data.
        if (
            request.url?.includes("logout") ||
            request.method?.toLowerCase() === "DELETE"
        ) {
            cache = setupCacheStore();
        }

        // Cache every request.
        request.adapter = cache.adapter;

        return request;
    }

    onResponse(response: EchoResponse): EchoResponse {
        return response;
    }

    onError(error: EchoError): EchoError {
        return error;
    }
}
