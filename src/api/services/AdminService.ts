import config from "@/config";
import {
    GET,
    Path,
    EchoPromise,
    EchoService,
    EchoServiceBuilder,
} from "echofetch";
import { AuthInterceptor } from "@/api/interceptors/AuthInterceptor";

class AdminService extends EchoService {
    @GET("/reports")
    getAll(): EchoPromise<string> {
        return {} as EchoPromise<string>;
    }

    @GET("/reports/{reportId}")
    getReport(@Path("reportId") reportId: string): EchoPromise<string> {
        return {} as EchoPromise<string>;
    }

    @GET("locations/{secretId}/reports")
    getLocationReports(
        @Path("secretId") secretId: string
    ): EchoPromise<string> {
        return {} as EchoPromise<string>;
    }

    @GET("/statistics")
    getStats(): EchoPromise<string> {
        return {} as EchoPromise<string>;
    }
}

export default new EchoServiceBuilder()
    .setBaseUrl(config.BACKEND.URL)
    .addInterceptor(new AuthInterceptor())
    .build(AdminService);
