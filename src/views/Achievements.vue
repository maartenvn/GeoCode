<template>
    <v-container class="container--small">
        <div class="section__title">
            Achievements
        </div>

        <div class="section__description">
            Achievements can be earned by interacting with GeoCode:

            <ul>
                <li>Creating locations & tours</li>
                <li>Visiting locations, tours and different countries</li>
                <li>Interacting with the community</li>
                <li>... and much more!</li>
            </ul>

            <p class="pt-4">
                You can view your earned achievements on your profile.
            </p>

            <p>
                Click on an achievement below to view its requirements!
            </p>
        </div>

        <v-row>
            <!-- Loading -->
            <template v-if="loading">
                <achievement-badge
                    v-for="index of 20"
                    :key="index"
                    :loading="true"
                />
            </template>

            <!-- Data -->
            <template v-else-if="success">
                <!-- Empty -->
                <template v-if="achievementsData.length === 0">
                    <v-col class="text-center">
                        <h3>No achievements available</h3>

                        <p>
                            There are currently no achievements available!
                        </p>
                    </v-col>
                </template>

                <!-- Not empty -->
                <template v-else>
                    <achievement-badge
                        v-for="(achievement, index) of achievementsData"
                        :key="index"
                        :achievement="achievement"
                        :is-achieved="achievement.achievedAt"
                    />
                </template>
            </template>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { RequestHandler } from "@/api/RequestHandler";
import AchievementBadge from "@/components/achievements/AchievementBadge.vue";
import AchievementService from "@/api/services/AchievementService";
import ErrorPlaceholder from "@/components/error/ErrorPlaceholder.vue";
import UserService from "@/api/services/UserService";
import Achievement from "@/api/models/Achievement";
import { StoreGetter } from "@/store/decorators/StoreGetterDecorator";
import { EchoPromise } from "echofetch";
import { Optional } from "@/types/Optional";

@Component({
    components: { ErrorPlaceholder, AchievementBadge },
})
export default class Achievements extends Vue {
    /**
     * List with all the available achievements.
     */
    achievements = RequestHandler.handle(AchievementService.getAll(), {
        id: "achievements",
        style: "SECTION",
        displayFullpage: true,
    });

    /**
     * List with all the user achievements.
     */
    userAchievements: Optional<EchoPromise<Array<Achievement>>> = null;

    /**
     * If the user is authenticated.
     */
    @StoreGetter("session/isAuthenticated")
    isAuthenticated: boolean;

    /**
     * Load user achievements when the user is authenticated.
     */
    @Watch("isAuthenticated", { immediate: true })
    handleAuthenticated() {
        if (this.isAuthenticated) {
            this.userAchievements = RequestHandler.handle(
                UserService.getAchievements(),
                {
                    id: "userAchievements",
                    style: "SECTION",
                    displayFullpage: true,
                }
            );
        }
    }

    /**
     * Get if the achievements are loading.
     */
    get loading(): boolean {
        if (this.isAuthenticated && this.userAchievements) {
            return (
                this.achievements.isLoading() ||
                this.userAchievements?.isLoading()
            );
        } else {
            return this.achievements.isLoading();
        }
    }

    /**
     * Get if the achievements requests have succeeded.
     */
    get success(): boolean {
        if (this.isAuthenticated && this.userAchievements) {
            return (
                this.achievements.isSuccess() &&
                this.userAchievements?.isSuccess()
            );
        } else {
            return this.achievements.isSuccess();
        }
    }

    /**
     * Get both user achievements & achievements together when success
     */
    get achievementsData(): Array<Achievement> {
        const achievementsList: Array<Achievement> = [];

        // Add the user achievements.
        if (this.userAchievements && this.userAchievements.isSuccess()) {
            achievementsList.push(...this.userAchievements?.requireData());
        }

        // Add all other achievements.
        if (this.achievements.isSuccess()) {
            // Only add the achievements that are not already in the list.
            achievementsList.push(
                ...this.achievements
                    .requireData()
                    .filter(
                        (value) =>
                            !achievementsList.find(
                                (ach: Achievement) => ach.id === value.id
                            )
                    )
            );
        }

        return achievementsList;
    }
}
</script>
