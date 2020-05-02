import {
    Body,
    DELETE,
    EchoPromise,
    EchoService,
    EchoServiceBuilder,
    FormField,
    FormMultipart,
    GET,
    Path,
    POST,
} from "echofetch";
import config from "@/config";
import { AuthInterceptor } from "@/api/interceptors/AuthInterceptor";
import User from "@/api/models/User";
import Achievement from "@/api/models/Achievement";
import { AchievementCreateWrapper } from "@/api/wrappers/AchievementWrapper";
import AchConditionFilter from "@/api/models/AchConditionFilter";
import AchConditionField from "@/api/models/AchConditionField";

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

    /**
     * Get list with filters for achievements.
     */
    @GET("/achievements/filters")
    getFilters(): EchoPromise<Array<AchConditionFilter>> {
        return {} as EchoPromise<Array<AchConditionFilter>>;
    }

    /**
     * Get list with fields for achievements.
     */
    @GET("/achievements/fields")
    getFields(): EchoPromise<Array<AchConditionField>> {
        return {} as EchoPromise<Array<AchConditionField>>;
    }

    /**
     * Create a new achievement.
     */
    @POST("/achievements")
    create(@Body() body: AchievementCreateWrapper): EchoPromise<Achievement> {
        return {} as EchoPromise<Achievement>;
    }

    /**
     * Delete an achievement by id.
     * @param id Id of the achievement
     */
    @DELETE("/achievements/{id}")
    delete(@Path("id") id: number): EchoPromise<void> {
        return {} as EchoPromise<void>;
    }

    /**
     * Upload an image for an achievement.
     * @param image Image file from form input.
     * @returns Id of the uploaded image.
     */
    @FormMultipart()
    @POST("/achievements/image")
    uploadImage(@FormField("image") image: File): EchoPromise<number> {
        return {} as EchoPromise<number>;
    }
}

export default new EchoServiceBuilder()
    .setBaseUrl(config.BACKEND.URL)
    .addInterceptor(new AuthInterceptor())
    .build(AchievementService);
