import {
    Body,
    EchoPromise,
    EchoService,
    EchoServiceBuilder,
    GET,
    Path,
} from "echofetch";
import Location from "../models/Location";
import config from "@/config";
import { AuthInterceptor } from "@/api/interceptors/AuthInterceptor";
import User from "@/api/models/User";

class UsersService extends EchoService {
    /**
     * Get a location by its secret id
     * @param secretId Secret id of the location.
     */
    @GET("/users/{id}")
    get(@Path("id") id: number): EchoPromise<User> {
        return {} as EchoPromise<User>;
    }
}

export default new EchoServiceBuilder()
    .setBaseUrl(config.BACKEND.URL)
    .addInterceptor(new AuthInterceptor())
    .build(UsersService);
