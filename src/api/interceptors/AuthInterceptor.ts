import { EchoServiceInterceptor } from "echofetch/dist/types/service/EchoServiceInterceptor";
import { EchoError, EchoRequest, EchoResponse } from "echofetch";

export class AuthInterceptor implements EchoServiceInterceptor {
    onRequest(request: EchoRequest): EchoRequest {
        // Send credentials with every request.
        request.withCredentials = true;

        return request;
    }

    onResponse(response: EchoResponse): EchoResponse {
        return response;
    }

    onError(error: EchoError): EchoError {
        return error;
    }
}
