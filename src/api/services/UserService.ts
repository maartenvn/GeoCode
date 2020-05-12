import {
    Body,
    EchoPromise,
    EchoService,
    EchoServiceBuilder,
    FormField,
    FormMultipart,
    DELETE,
    GET,
    PATCH,
    Path,
    POST,
} from "echofetch";
import User from "../models/User";
import Location from "../models/Location";
import config from "@/config";
import { AuthInterceptor } from "@/api/interceptors/AuthInterceptor";
import { InputFields } from "@/types/fields/InputFields";
import Visit from "@/api/models/Visit";
import UserStatistics from "@/api/models/UserStatistics";
import Achievement from "@/api/models/Achievement";
import Tour from "@/api/models/Tour";
import { UserDataWrapper } from "@/api/wrappers/UserWrapper.ts";

class UserService extends EchoService {
    /**
     * Get the logged in user.
     */
    @GET("/user")
    get(): EchoPromise<User> {
        return {} as EchoPromise<User>;
    }

    /**
     * Get a list with location of the logged in user.
     */
    @GET("/user/locations")
    getLocations(): EchoPromise<Array<Location>> {
        return {} as EchoPromise<Array<Location>>;
    }

    /**
     * Get a list with tours of the logged in user.
     */
    @GET("/user/tours")
    getTours(): EchoPromise<Array<Tour>> {
        return {} as EchoPromise<Array<Tour>>;
    }

    /**
     * Get a list of visits of the logged in user.
     */
    @GET("/user/visits")
    getVisits(): EchoPromise<Array<Visit>> {
        return {} as EchoPromise<Array<Visit>>;
    }

    /**
     * Get a list of visits for a given location of the logged in user.
     * @param secretId Secret id of the location.
     */
    @GET("/user/visits/{secretId}")
    getVisitsByLocation(
        @Path("secretId") secretId: string
    ): EchoPromise<Array<Visit>> {
        return {} as EchoPromise<Array<Visit>>;
    }

    /**
     * Get statistics for the logged in user.
     */
    @GET("/user/statistics")
    getStatistics(): EchoPromise<UserStatistics> {
        return {} as EchoPromise<UserStatistics>;
    }

    /**
     * Get achievements for the logged in user.
     */
    @GET("/user/achievements")
    getAchievements(): EchoPromise<Array<Achievement>> {
        return {} as EchoPromise<Array<Achievement>>;
    }

    /**
     * Update the current user
     */
    @PATCH("/user")
    update(@Body() body: InputFields): EchoPromise<string> {
        return {} as EchoPromise<string>;
    }

    /**
     * Upload an image for the avatar.
     * @param image
     */
    @FormMultipart()
    @POST("/user/avatar")
    updateAvatar(@FormField("image") image: File): EchoPromise<number> {
        return {} as EchoPromise<number>;
    }

    @DELETE("/user")
    delete(): EchoPromise<void> {
        return {} as EchoPromise<void>;
    }

    @DELETE("user/data")
    deleteData(@Body() body: UserDataWrapper): EchoPromise<void> {
        return {} as EchoPromise<void>;
    }
}

export default new EchoServiceBuilder()
    .setBaseUrl(config.BACKEND.URL)
    .addInterceptor(new AuthInterceptor())
    .build(UserService);
