import User from "./models/User";
import Config from "@/config";
import { fetchData } from "@/util/fetchutil";
import { createModel } from "./struct/Model";

/**
 * Get the logged in user.
 */
export function getCurrentUser(): Promise<User> {
    return fetchData<User>({
        url: `${Config.BACKEND.URL}${Config.BACKEND.ENDPOINTS.SESSION}`,
        create: createModel(User),
        method: "GET"
    });
}
