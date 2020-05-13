import { EchoPromise, EchoService, EchoServiceBuilder, GET } from "echofetch";
import config from "@/config";
import { AuthInterceptor } from "@/api/interceptors/AuthInterceptor";
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
