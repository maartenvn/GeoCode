import {
    Body,
    EchoPromise,
    EchoService,
    EchoServiceBuilder,
    GET,
    PATCH,
    Path
} from "echofetch";
import config from "@/config";
import { AuthInterceptor } from "@/api/interceptors/AuthInterceptor";
import Rating from "@/api/models/Rating";
import {
    RatingCreateWrapper,
    RatingUpdateWrapper
} from "@/api/wrappers/RatingWrapper";
import {
    CommentCreateWrapper,
    CommentUpdateWrapper
} from "@/api/wrappers/CommentWrapper";

class CommentService extends EchoService {
    /**
     * Get a list of comments for a specific location.
     * @param secretId Secret id of the location.
     */
    @GET("/locations/{secretId}/comments")
    getAll(@Path("secretId") secretId: string): EchoPromise<Array<Rating>> {
        return {} as EchoPromise<Array<Rating>>;
    }

    /**
     * Get a comment by id.
     * @param id Id of the comment.
     */
    @GET("/comments/{id}")
    get(@Path("id") id: number): EchoPromise<Rating> {
        return {} as EchoPromise<Rating>;
    }

    /**
     * Update a comment.
     * @param id Id of the comment.
     * @param body
     */
    @PATCH("/comments/{id}")
    update(
        @Path("id") id: number,
        @Body() body: CommentUpdateWrapper
    ): EchoPromise<Rating> {
        return {} as EchoPromise<Rating>;
    }

    /**
     * Delete a comment.
     * @param id Id of the rating.
     */
    @PATCH("/comments/{id}")
    delete(@Path("id") id: number): EchoPromise<void> {
        return {} as EchoPromise<void>;
    }

    /**
     * Create a new comment for a specific location.
     * @param secretId Secret id of the location.
     * @param body
     */
    @GET("/locations/{secretId}/comments")
    create(
        @Path("secretId") secretId: string,
        @Body() body: CommentCreateWrapper
    ): EchoPromise<Rating> {
        return {} as EchoPromise<Rating>;
    }
}

export default new EchoServiceBuilder()
    .setBaseUrl(config.BACKEND.URL)
    .addInterceptor(new AuthInterceptor())
    .build(CommentService);
