import { EchoPromise, EchoService, EchoServiceBuilder, GET } from "echofetch";
import config from "@/config";
import CurrentLocation from "@/api/models/CurrentLocation";
import { AuthInterceptor } from "@/api/interceptors/AuthInterceptor";

class CurrentLocationService extends EchoService {
    /**
     * Get current location of the user.
     */
    @GET("/currentlocation")
    getCurrentLocation(): EchoPromise<CurrentLocation> {
        return {} as EchoPromise<CurrentLocation>;
    }
}

export default new EchoServiceBuilder()
    .setBaseUrl(config.BACKEND.URL)
    .addInterceptor(new AuthInterceptor())
    .build(CurrentLocationService);
