import {
    Body,
    EchoPromise,
    EchoService,
    EchoServiceBuilder,
    FormField,
    FormMultipart,
    Path,
    POST,
} from "echofetch";
import config from "@/config";
import { AuthInterceptor } from "@/api/interceptors/AuthInterceptor";
import { ReportCreateWrapper } from "@/api/wrappers/ReportWrapper";

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
}

export default new EchoServiceBuilder()
    .setBaseUrl(config.BACKEND.URL)
    .addInterceptor(new AuthInterceptor())
    .build(ReportService);
