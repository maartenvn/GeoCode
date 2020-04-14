import {
    Body,
    EchoPromise,
    EchoService,
    EchoServiceBuilder,
    GET,
    PATCH,
    Path
} from "echofetch";
import User from "../models/User";
import Location from "../models/Location";
import config from "@/config";
import { AuthInterceptor } from "@/api/interceptors/AuthInterceptor";
import { InputFields } from "@/types/fields/InputFields";
import Visit from "@/api/models/Visit";
import Statistics from "@/api/models/Statistics";

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
    getStatistics(): EchoPromise<Statistics> {
        return {} as EchoPromise<Statistics>;
    }

    /**
     * Update the current user
     */
    @PATCH("/user")
    update(@Body() body: InputFields): EchoPromise<string> {
        return {} as EchoPromise<string>;
    }
}

export default new EchoServiceBuilder()
    .setBaseUrl(config.BACKEND.URL)
    .addInterceptor(new AuthInterceptor())
    .build(UserService);
