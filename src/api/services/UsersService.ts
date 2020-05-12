import {
    EchoPromise,
    EchoService,
    EchoServiceBuilder,
    Body,
    GET,
    Path,
    PATCH,
    DELETE,
} from "echofetch";
import config from "@/config";
import { AuthInterceptor } from "@/api/interceptors/AuthInterceptor";
import User from "@/api/models/User";
import { UserUpdateWrapper } from "@/api/wrappers/UserUpdateWrapper";

class UsersService extends EchoService {
    /**
     * Get a list of all users
     */
    @GET("/users")
    getAll(): EchoPromise<Array<User>> {
        return {} as EchoPromise<Array<User>>;
    }

    /**
     * Get a location by its secret id
     * @param secretId Secret id of the location.
     */
    @GET("/users/{id}")
    get(@Path("id") id: number): EchoPromise<User> {
        return {} as EchoPromise<User>;
    }

    @DELETE("/users/{id}")
    delete(@Path("id") id: number): EchoPromise<void> {
        return {} as EchoPromise<void>;
    }

    @PATCH("/users/{id}")
    update(
        @Path("id") id: number,
        @Body() body: UserUpdateWrapper
    ): EchoPromise<void> {
        return {} as EchoPromise<void>;
    }
}

export default new EchoServiceBuilder()
    .setBaseUrl(config.BACKEND.URL)
    .addInterceptor(new AuthInterceptor())
    .build(UsersService);
