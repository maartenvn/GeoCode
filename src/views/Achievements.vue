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
            <template v-if="achievements.isLoading()">
                <achievement-badge
                    v-for="index of 20"
                    :key="index"
                    :loading="true"
                />
            </template>

            <!-- Data -->
            <template v-else-if="achievements.isSuccess()">
                <!-- Empty -->
                <template v-if="achievements.requireData().length === 0">
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
                        v-for="(achievement,
                        index) of achievements.requireData()"
                        :key="index"
                        :achievement="achievement"
                        :is-achieved="true"
                    />
                </template>
            </template>

            <!-- Error -->
            <template v-else-if="achievements.isError()">
                <v-col>
                    <error-placeholder error-id="achievements" />
                </v-col>
            </template>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { RequestHandler } from "@/api/RequestHandler";
import AchievementBadge from "@/components/achievements/AchievementBadge.vue";
import AchievementService from "@/api/services/AchievementService";
import ErrorPlaceholder from "@/components/error/ErrorPlaceholder.vue";

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
    });
}
</script>
