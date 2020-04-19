import config from "@/config";
import Location from "../models/Location";
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
import {
    LocationCreateWrapper,
    LocationIdWrapper,
    LocationUpdateWrapper,
} from "@/api/wrappers/LocationWrapper";
import { AuthInterceptor } from "@/api/interceptors/AuthInterceptor";

class LocationService extends EchoService {
    /**
     * Get a location by its secret id
     * @param secretId Secret id of the location.
     */
    @GET("/locations/{secretId}")
    get(@Path("secretId") secretId: string): EchoPromise<Location> {
        return {} as EchoPromise<Location>;
    }

    /**
     * Get a list with location.
     */
    @GET("/locations")
    getAll(): EchoPromise<Array<Location>> {
        return {} as EchoPromise<Array<Location>>;
    }

    /**
     * Get the statistics for a specific location.
     * @param secretId Secret id of the location.
     */
    @GET("/locations/{secretId}/statistics")
    getStatistics(@Path("secretId") secretId: string): EchoPromise<Location> {
        return {} as EchoPromise<Location>;
    }

    /**
     * Get a list of visits for a specific location.
     * @param secretId Secret id of the location.
     */
    @GET("/locations/{secretId}/visits")
    getVisits(@Path("secretId") secretId: string): EchoPromise<Location> {
        return {} as EchoPromise<Location>;
    }

    /**
     * Get a location by a given secret visit code.
     * @param visitSecret Secret visit code.
     */
    @GET("/locations/visits/{visitSecret}")
    getLocationByVisitSecret(
        @Path("visitSecret") visitSecret: string
    ): EchoPromise<Location> {
        return {} as EchoPromise<Location>;
    }

    /**
     * Visit a location by a given secret visit code.
     * @param visitSecret Secret visit code.
     */
    @POST("/locations/visits/{visitSecret}")
    visitLocation(
        @Path("visitSecret") visitSecret: string
    ): EchoPromise<LocationIdWrapper> {
        return {} as EchoPromise<LocationIdWrapper>;
    }

    /**
     * Create a new location.
     * @param locationCreate Location parameters for the new location.
     */
    @POST("/locations")
    create(
        @Body() body: LocationCreateWrapper
    ): EchoPromise<LocationIdWrapper> {
        return {} as EchoPromise<LocationIdWrapper>;
    }

    /**
     * Delete a location
     * @param secretId Id of the location
     */
    @DELETE("/locations/{secretId}")
    delete(@Path("secretId") secretId: string): EchoPromise<string> {
        return {} as EchoPromise<string>;
    }

    /**
     * Update a location
     * @param secretId Id of the location
     */
    @PATCH("/locations/{secretId}")
    update(
        @Path("secretId") secretId: string,
        @Body() body: LocationUpdateWrapper
    ): EchoPromise<void> {
        return {} as EchoPromise<void>;
    }
}

export default new EchoServiceBuilder()
    .setBaseUrl(config.BACKEND.URL)
    .addInterceptor(new AuthInterceptor())
    .build(LocationService);
