import config from "@/config";
import {
    Body,
    DELETE,
    EchoPromise,
    EchoService,
    EchoServiceBuilder,
    GET,
    PATCH,
    Path,
    POST,
} from "echofetch";
import { AuthInterceptor } from "@/api/interceptors/AuthInterceptor";
import Tour from "@/api/models/Tour";
import { TourIdWrapper, TourUpdateWrapper } from "@/api/wrappers/TourWrapper";
import TourStatistics from "@/api/models/TourStatistics";

class TourService extends EchoService {
    /**
     * Get a tour by its secret id
     * @param secretId Secret id of the tour.
     */
    @GET("/tours/{secretId}")
    get(@Path("secretId") secretId: string): EchoPromise<Tour> {
        return {} as EchoPromise<Tour>;
    }

    /**
     * Get a list with tours.
     */
    @GET("/tours")
    getAll(): EchoPromise<Array<Tour>> {
        return {} as EchoPromise<Array<Tour>>;
    }

    /**
     * Get the statistics for a specific tour.
     * @param secretId Secret id of the tour.
     */
    @GET("/tours/{secretId}/statistics")
    getStatistics(
        @Path("secretId") secretId: string
    ): EchoPromise<TourStatistics> {
        return {} as EchoPromise<TourStatistics>;
    }

    /**
     * Create a new tour.
     * @param body Tour parameters for the new tour.
     */
    @POST("/tours")
    create(@Body() body: TourIdWrapper): EchoPromise<TourIdWrapper> {
        return {} as EchoPromise<TourIdWrapper>;
    }

    /**
     * Delete a tour
     * @param secretId Id of the tour
     */
    @DELETE("/tours/{secretId}")
    delete(@Path("secretId") secretId: string): EchoPromise<string> {
        return {} as EchoPromise<string>;
    }

    /**
     * Update a tour
     * @param secretId Id of the tour
     * @param body Tour parameters to update the tour
     */
    @PATCH("/tours/{secretId}")
    update(
        @Path("secretId") secretId: string,
        @Body() body: TourUpdateWrapper
    ): EchoPromise<void> {
        return {} as EchoPromise<void>;
    }
}

export default new EchoServiceBuilder()
    .setBaseUrl(config.BACKEND.URL)
    .addInterceptor(new AuthInterceptor())
    .build(TourService);
