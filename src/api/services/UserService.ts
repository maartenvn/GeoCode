import {
    Body,
    EchoPromise,
    EchoService,
    EchoServiceBuilder,
    GET,
    PATCH
} from "echofetch";
import User from "../models/User";
import Location from "../models/Location";
import config from "@/config";
import { AuthInterceptor } from "@/api/interceptors/AuthInterceptor";
import { InputFields } from "@/types/fields/InputFields";

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
