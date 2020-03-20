import { createModel } from "../struct/Model";
import { InputFieldsUpdate } from "@/util/fieldsutil";
import FetchHandler from "../FetchHandler";
import User from "../models/User";
import ErrorMixin from "../error/ErrorMixin";
import Location from "../models/Location";
import Value from "../models/Value";
import store from "@/store/store";
import config from "@/config";

export class UserCreate {
    public username: string;
    public email: string;
    public password: string;
    public passwordRepeat: string;
}

export class UserLogin {
    public email: string;
    public password: string;
}

export default class UserService {
    /**
     * Get the logged in user.
     */
    static getCurrent(): Promise<User> {
        return FetchHandler.fetch<User>({
            url: `${config.BACKEND.URL}${config.BACKEND.ENDPOINTS.SESSION.USER}`,
            create: createModel(User),
            method: "GET"
        });
    }

    /**
     * Get a list with locations of the logged in user.
     */
    static getCurrentLocations(): Promise<Array<Location>> {
        return FetchHandler.fetch<Array<Location>>({
            url: `${config.BACKEND.URL}${config.BACKEND.ENDPOINTS.SESSION.LOCATIONS}`,
            create: createModel(Location),
            method: "GET"
        });
    }

    /**
     * Create a new user.
     * @param userCreate User parameters for the new user.
     */
    static register(userCreate: UserCreate): Promise<Value> {
        return FetchHandler.fetch<Value>({
            url: `${config.BACKEND.URL}${config.BACKEND.ENDPOINTS.AUTH.REGISTER}`,
            create: createModel(Value),
            method: "POST",
            options: {
                data: userCreate
            }
        });
    }

    /**
     * Login into an account.
     * @param userLogin User parameters to login.
     */
    static login(userLogin: UserLogin): Promise<Value> {
        return FetchHandler.fetch<Value>({
            url: `${config.BACKEND.URL}${config.BACKEND.ENDPOINTS.AUTH.LOGIN}`,
            create: createModel(Value),
            method: "POST",
            options: {
                data: userLogin
            }
        });
    }

    /**
     * Logout the current user.
     */
    static logout(): Promise<void> {
        // Send loading message.
        store.dispatch("snackbar/open", {
            message: "Logging out...",
            color: "info",
            timeout: 120 * 1000
        });

        return FetchHandler.fetch<Value>({
            url: `${config.BACKEND.URL}${config.BACKEND.ENDPOINTS.AUTH.LOGOUT}`,
            create: createModel(Value),
            method: "POST"
        })
            .then(_ => {
                // Send confirmation message.
                store.dispatch("snackbar/open", {
                    message: "Successfully logged out",
                    color: "success"
                });

                // Update the current user inside the store.
                store.dispatch("session/fetch");
            })
            .catch(error => {
                new ErrorMixin().$error(error, {
                    style: "SECTION",
                    id: "logout",
                    displayFullpage: true
                });
            });
    }

    /**
     * Update the current user
     * @param key Name of the field to update.
     * @param value New value for the given field key.
     */
    static update(changes: InputFieldsUpdate): Promise<Value> {
        return FetchHandler.fetch<Value>({
            url: `${config.BACKEND.URL}${config.BACKEND.ENDPOINTS.SESSION.USER}`,
            create: createModel(Value),
            method: "PATCH",
            options: {
                data: changes
            }
        });
    }
}
