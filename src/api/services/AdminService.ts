import config from "@/config";
import { GET, EchoPromise, EchoService, EchoServiceBuilder } from "echofetch";
import { AuthInterceptor } from "@/api/interceptors/AuthInterceptor";

class AdminService extends EchoService {
    @GET("/reports")
    getAll(): EchoPromise<string> {
        return {} as EchoPromise<string>;
    }
}

export default new EchoServiceBuilder()
    .setBaseUrl(config.BACKEND.URL)
    .addInterceptor(new AuthInterceptor())
    .build(AdminService);
