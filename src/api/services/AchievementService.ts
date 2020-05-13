import {
    EchoPromise,
    EchoService,
    EchoServiceBuilder,
    GET,
    Path,
} from "echofetch";
import config from "@/config";
import { AuthInterceptor } from "@/api/interceptors/AuthInterceptor";
import Achievement from "@/api/models/Achievement";

class AchievementService extends EchoService {
    /**
     * Get a list of available achievements.
     */
    @GET("/achievements")
    getAll(): EchoPromise<Array<Achievement>> {
        return {} as EchoPromise<Array<Achievement>>;
    }

    /**
     * Get an achievement by id.
     * @param id Id of the achievement
     */
    @GET("/achievements/{id}")
    get(@Path("id") id: number): EchoPromise<Achievement> {
        return {} as EchoPromise<Achievement>;
    }
}

export default new EchoServiceBuilder()
    .setBaseUrl(config.BACKEND.URL)
    .addInterceptor(new AuthInterceptor())
    .build(AchievementService);
