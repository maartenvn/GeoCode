import User from "./models/User";
import Config from "@/config";
import { fetchData } from "@/util/fetchutil";
import { createModel } from "./struct/Model";
import Value from "./models/Value";

/**
 * Get the logged in user.
 */
export function getCurrentUser(): Promise<User> {
    return fetchData<User>({
        url: `${Config.BACKEND.URL}${Config.BACKEND.ENDPOINTS.AUTH.SESSION}`,
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
