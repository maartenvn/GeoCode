import User from "./models/User";
import Config from "@/config";
import Value from "./models/Value";
import { fetchData } from "@/util/fetchutil";
import { createModel } from "./struct/Model";
import ErrorMixin from "@/util/error/errormixin";
import store from "@/store/store";
import { InputFieldsUpdate } from "@/util/fieldsutil";
/**
 * Get the logged in user.
 */
export function getCurrentUser(): Promise<User> {
    return fetchData<User>({
        url: `${Config.BACKEND.URL}${Config.BACKEND.ENDPOINTS.SESSION.USER}`,
        create: createModel(User),
        method: "GET"
    });
}

export class UserCreate {
    public username: string;
    public email: string;
    public password: string;
    public passwordRepeat: string;
}

/**
 * Create a new user.
 * @param userCreate User parameters for the new user.
 */
export function registerUser(userCreate: UserCreate): Promise<Value> {
    return fetchData<Value>({
        url: `${Config.BACKEND.URL}${Config.BACKEND.ENDPOINTS.AUTH.REGISTER}`,
        create: createModel(Value),
        method: "POST",
        options: {
            data: userCreate
        }
    });
}

export class UserLogin {
    public email: string;
    public password: string;
}

/**
 * Login into an account.
 * @param userLogin User parameters to login.
 */
export function loginUser(userLogin: UserLogin): Promise<Value> {
    return fetchData<Value>({
        url: `${Config.BACKEND.URL}${Config.BACKEND.ENDPOINTS.AUTH.LOGIN}`,
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
export function logoutUser(): Promise<void> {
    // Send loading message.
    store.dispatch("snackbar/open", {
        message: "Logging out...",
        color: "info",
        timeout: 120 * 1000
    });

    return fetchData<Value>({
        url: `${Config.BACKEND.URL}${Config.BACKEND.ENDPOINTS.AUTH.LOGOUT}`,
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
export function updateUser(changes: InputFieldsUpdate): Promise<Value> {
    return fetchData<Value>({
        url: `${Config.BACKEND.URL}${Config.BACKEND.ENDPOINTS.SESSION.USER}s`,
        create: createModel(Value),
        method: "PATCH",
        options: {
            data: changes
        }
    });
}
