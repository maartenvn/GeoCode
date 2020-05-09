import {
    EchoPromise,
    EchoService,
    EchoServiceBuilder,
    GET,
    Path,
} from "echofetch";
import config from "@/config";
import { AuthInterceptor } from "@/api/interceptors/AuthInterceptor";
import User from "@/api/models/User";

class UsersService extends EchoService {
    /**
     * Get a list of all users
     */
    @GET("/users")
    getAll(): EchoPromise<User> {
        return {} as EchoPromise<User>;
    }

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
