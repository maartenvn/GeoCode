import {
    Body,
    EchoPromise,
    EchoService,
    EchoServiceBuilder,
    FormField,
    FormMultipart,
    PATCH,
    Path,
    POST,
} from "echofetch";
import config from "@/config";
import { AuthInterceptor } from "@/api/interceptors/AuthInterceptor";
import {
    ReportCreateWrapper,
    ReportUpdateWrapper,
} from "@/api/wrappers/ReportWrapper";

class ReportService extends EchoService {
    /**
     * Create a new report for a specific location.
     * @param secretId Secret id of the location.
     * @param body
     */
    @POST("/locations/{secretId}/reports")
    create(
        @Path("secretId") secretId: string,
        @Body() body: ReportCreateWrapper
    ): EchoPromise<void> {
        return {} as EchoPromise<void>;
    }

    /**
     * Upload an image for a report.
     * @param secretId Secret id of the location.
     * @param body
     */
    @FormMultipart()
    @POST("/reports/image")
    uploadImage(@FormField("image") image: File): EchoPromise<number> {
        return {} as EchoPromise<number>;
    }

    @PATCH("/reports/{reportId}")
    update(
        @Path("reportId") reportId: string,
        @Body() body: ReportUpdateWrapper
    ): EchoPromise<void> {
        return {} as EchoPromise<void>;
    }
}

export default new EchoServiceBuilder()
    .setBaseUrl(config.BACKEND.URL)
    .addInterceptor(new AuthInterceptor())
    .build(ReportService);
