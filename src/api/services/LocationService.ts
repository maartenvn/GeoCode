import config from "@/config";
import Location from "../models/Location";
import {
    Body,
    DELETE,
    EchoPromise,
    EchoService,
    EchoServiceBuilder,
    GET,
    Path,
    POST
} from "echofetch";
import { LocationCreateWrapper } from "@/api/wrappers/LocationWrapper";
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
     * Create a new location.
     * @param locationCreate Location parameters for the new location.
     */
    @POST("/locations")
    create(@Body() body: LocationCreateWrapper): EchoPromise<string> {
        return {} as EchoPromise<string>;
    }

    /**
     * Delete a location
     * @param location Location to delete
     */
    @DELETE("/locations/{secretId}")
    delete(@Path("secretId") secretId: string): EchoPromise<string> {
        return {} as EchoPromise<string>;
    }
}

export default new EchoServiceBuilder()
    .setBaseUrl(config.BACKEND.URL)
    .addInterceptor(new AuthInterceptor())
    .build(LocationService);
