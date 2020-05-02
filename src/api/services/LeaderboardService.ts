import {
    EchoPromise,
    EchoService,
    EchoServiceBuilder,
    GET,
    Query,
} from "echofetch";
import { AuthInterceptor } from "@/api/interceptors/AuthInterceptor";
import LeaderboardUser from "../models/LeaderboardUser";
import config from "@/config";

class LeaderboardService extends EchoService {
    /**
     * Get the leaderboard for the most visited locations.
     */
    @GET("/leaderboards/visitedLocations")
    getVisitedLocations(
        @Query("limit") limit: number
    ): EchoPromise<LeaderboardUser> {
        return {} as EchoPromise<LeaderboardUser>;
    }

    /**
     * Get the leaderboard for the most visited tours.
     */
    @GET("/leaderboards/visitedTours")
    getVisitedTours(
        @Query("limit") limit: number
    ): EchoPromise<LeaderboardUser> {
        return {} as EchoPromise<LeaderboardUser>;
    }

    /**
     * Get the leaderboard for the most visited countries.
     */
    @GET("/leaderboards/visitedCountries")
    getVisitedCountries(
        @Query("limit") limit: number
    ): EchoPromise<LeaderboardUser> {
        return {} as EchoPromise<LeaderboardUser>;
    }

    /**
     * Get the leaderboard for the most created locations.
     */
    @GET("/leaderboards/createdLocations")
    getCreatedLocations(
        @Query("limit") limit: number
    ): EchoPromise<LeaderboardUser> {
        return {} as EchoPromise<LeaderboardUser>;
    }

    /**
     * Get the leaderboard for the most created tours.
     */
    @GET("/leaderboards/createdTours")
    getCreatedTours(
        @Query("limit") limit: number
    ): EchoPromise<LeaderboardUser> {
        return {} as EchoPromise<LeaderboardUser>;
    }
}

export default new EchoServiceBuilder()
    .setBaseUrl(config.BACKEND.URL)
    .addInterceptor(new AuthInterceptor())
    .build(LeaderboardService);
