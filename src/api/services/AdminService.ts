import config from "@/config";
import {
    EchoPromise,
    EchoService,
    EchoServiceBuilder,
    GET,
    Path,
} from "echofetch";
import { AuthInterceptor } from "@/api/interceptors/AuthInterceptor";
import Report from "@/api/models/Report.ts";
import GeneralStatistics from "../models/GeneralStatistics";

class AdminService extends EchoService {
    @GET("/reports")
    getAll(): EchoPromise<Array<Report>> {
        return {} as EchoPromise<Array<Report>>;
    }

    @GET("/reports/{reportId}")
    getReport(@Path("reportId") reportId: string): EchoPromise<Report> {
        return {} as EchoPromise<Report>;
    }

    @GET("locations/{secretId}/reports")
    getLocationReports(
        @Path("secretId") secretId: string
    ): EchoPromise<Array<Report>> {
        return {} as EchoPromise<Array<Report>>;
    }

    @GET("/statistics")
    getStats(): EchoPromise<GeneralStatistics> {
        return {} as EchoPromise<GeneralStatistics>;
    }
}

export default new EchoServiceBuilder()
    .setBaseUrl(config.BACKEND.URL)
    .addInterceptor(new AuthInterceptor())
    .build(AdminService);
