import User from "@/api/models/User";
import config from "@/config";

export class UserUtil {
    /**
     * Get the avatar URL for a specific user.
     * @param user User
     */
    static getAvatarUrl(user: User) {
        if (user.avatar) {
            if (user.avatar.id) {
                return `${config.BACKEND.URL}images/${user.avatar.id}`;
            }
        }

        return "";
    }
}
