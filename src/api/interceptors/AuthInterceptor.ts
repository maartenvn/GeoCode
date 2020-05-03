import { EchoServiceInterceptor } from "echofetch/dist/types/service/EchoServiceInterceptor";
import { EchoError, EchoRequest, EchoResponse } from "echofetch";
import { setupCache } from "axios-cache-adapter";

// Create a cache for storing the network results.
const cache = setupCache({
    maxAge: 15 * 60 * 1000,
});

export class AuthInterceptor implements EchoServiceInterceptor {
    onRequest(request: EchoRequest): EchoRequest {
        // Send credentials with every request.
        request.withCredentials = true;

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
