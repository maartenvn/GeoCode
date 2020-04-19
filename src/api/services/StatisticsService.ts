import {
    Body,
    EchoPromise,
    EchoService,
    EchoServiceBuilder,
    GET,
    PATCH,
    Path,
} from "echofetch";
import User from "../models/User";
import Location from "../models/Location";
import config from "@/config";
import { AuthInterceptor } from "@/api/interceptors/AuthInterceptor";
import { InputFields } from "@/types/fields/InputFields";
import Visit from "@/api/models/Visit";
import UserStatistics from "@/api/models/UserStatistics";
import GeneralStatistics from "@/api/models/GeneralStatistics";

class StatisticsService extends EchoService {
    /**
     * Get general statistics.
     */
    @GET("statistics")
    get(): EchoPromise<GeneralStatistics> {
        return {} as EchoPromise<GeneralStatistics>;
    }
}

export default new EchoServiceBuilder()
    .setBaseUrl(config.BACKEND.URL)
    .addInterceptor(new AuthInterceptor())
    .build(StatisticsService);
