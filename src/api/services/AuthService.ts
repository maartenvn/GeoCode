import {
    Body,
    EchoPromise,
    EchoService,
    EchoServiceBuilder,
    PATCH,
    POST,
} from "echofetch";
import {
    AuthLoginWrapper,
    AuthRegisterWrapper,
    AuthPasswordUpdateWrapper,
} from "@/api/wrappers/AuthWrapper";
import { ErrorHandler } from "@/api/error/ErrorHandler";
import { AuthInterceptor } from "@/api/interceptors/AuthInterceptor";
import config from "@/config";
import store from "@/store/store";
import router from "@/plugins/router";

class AuthService extends EchoService {
    /**
     * Login into an account.
     * @param body User parameters to login.
     */
    @POST("/auth/login")
    login(@Body() body: AuthRegisterWrapper): EchoPromise<string> {
        return {} as EchoPromise<string>;
    }

    /**
     * Create a new user.
     * @param body User parameters for the new user.
     */
    @POST("/auth/register")
    register(@Body() body: AuthLoginWrapper): EchoPromise<string> {
        return {} as EchoPromise<string>;
    }

    @PATCH("/user/passwordreset")
    changePassword(@Body() body: AuthPasswordUpdateWrapper): EchoPromise<void> {
        return {} as EchoPromise<void>;
    }

    /**
     * Logout the current user.
     */
    @POST("/auth/logout")
    logout(): EchoPromise<string> {
        return {} as EchoPromise<string>;
    }

    /**
     * Call the logout function and show the progress
     * @param goHome If the user should be send to the homepage after logging out.
     */
    handleLogout(goHome = false) {
        // Send loading message.
        store.dispatch("snackbar/open", {
            message: "Logging out...",
            color: "info",
            timeout: 120 * 1000,
        });

        this.logout()
            .then((_) => {
                // Send confirmation message.
                store.dispatch("snackbar/open", {
                    message: "Successfully logged out",
                    color: "success",
                });

                if (goHome) {
                    router.push("/");
                }

                // Update the current user inside the store.
                store.dispatch("session/fetch");
            })
            .catch((error) => {
                ErrorHandler.handle(error, {
                    style: "SECTION",
                    id: "logout",
                    displayFullpage: true,
                });
            });
    }
}

export default new EchoServiceBuilder()
    .setBaseUrl(config.BACKEND.URL)
    .addInterceptor(new AuthInterceptor())
    .build(AuthService);
