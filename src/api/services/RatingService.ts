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
import config from "@/config";
import { AuthInterceptor } from "@/api/interceptors/AuthInterceptor";
import Rating from "@/api/models/Rating";
import {
    RatingCreateWrapper,
    RatingUpdateWrapper,
} from "@/api/wrappers/RatingWrapper";

class RatingService extends EchoService {
    /**
     * Get a list of rating for a specific location.
     * @param secretId Secret id of the location.
     */
    @GET("/locations/{secretId}/ratings")
    getAll(@Path("secretId") secretId: string): EchoPromise<Array<Rating>> {
        return {} as EchoPromise<Array<Rating>>;
    }

    /**
     * Get a rating by id.
     * @param id Id of the rating.
     */
    @GET("/ratings/{id}")
    get(@Path("id") id: number): EchoPromise<Rating> {
        return {} as EchoPromise<Rating>;
    }

    /**
     * Update a rating.
     * @param id Id of the rating.
     * @param body
     */
    @PATCH("/ratings/{id}")
    update(
        @Path("id") id: number,
        @Body() body: RatingUpdateWrapper
    ): EchoPromise<Rating> {
        return {} as EchoPromise<Rating>;
    }

    /**
     * Delete a rating.
     * @param id Id of the rating.
     */
    @DELETE("/ratings/{id}")
    delete(@Path("id") id: number): EchoPromise<void> {
        return {} as EchoPromise<void>;
    }

    /**
     * Create a new rating for a specific location.
     * @param secretId Secret id of the location.
     * @param body
     */
    @POST("/locations/{secretId}/ratings")
    create(
        @Path("secretId") secretId: string,
        @Body() body: RatingCreateWrapper
    ): EchoPromise<Rating> {
        return {} as EchoPromise<Rating>;
    }
}

export default new EchoServiceBuilder()
    .setBaseUrl(config.BACKEND.URL)
    .addInterceptor(new AuthInterceptor())
    .build(RatingService);
