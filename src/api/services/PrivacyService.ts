import { EchoPromise, EchoService, EchoServiceBuilder, GET } from "echofetch";
import { AuthInterceptor } from "@/api/interceptors/AuthInterceptor";
import config from "@/config";

class PrivacyService extends EchoService {
    /**
     * Get current location of the user.
     */
    @GET("/privacyagreement")
    getPrivacyAgreement(): EchoPromise<HTMLDocument> {
        return {} as EchoPromise<HTMLDocument>;
    }
}

export default new EchoServiceBuilder()
    .setBaseUrl(config.BACKEND.URL)
    .addInterceptor(new AuthInterceptor())
    .build(PrivacyService);
