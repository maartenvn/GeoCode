<template>
    <v-row>
        <!-- Achievements -->
        <v-col cols="12">
            <div class="section__title">
                Achievements
            </div>

            <v-row>
                <!-- Loading -->
                <template v-if="achievements.isLoading()">
                    <achievement-badge
                        v-for="index of 8"
                        :key="index"
                        :loading="true"
                    />
                </template>

                <!-- Data -->
                <template v-else-if="achievements.isSuccess()">
                    <!-- Empty -->
                    <template v-if="achievements.requireData().length === 0">
                        <v-col class="text-center">
                            <h3>No achievements earned yet</h3>

                            <p>
                                You have not earned any achievements yet!
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
                        <error-placeholder error-id="userAchievements" />
                    </v-col>
                </template>
            </v-row>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import User from "@/api/models/User";
import UserService from "@/api/services/UserService";
import { RequestHandler } from "@/api/RequestHandler";
import AchievementBadge from "@/components/achievements/AchievementBadge.vue";
import ErrorPlaceholder from "@/components/error/ErrorPlaceholder.vue";

@Component({
    components: { ErrorPlaceholder, AchievementBadge },
})
export default class ProfileAchievements extends Vue {
    /**
     * Logged in user.
     */
    @Prop()
    currentUser: User;

    /**
     * Achievements for the user.
     */
    achievements = RequestHandler.handle(UserService.getAchievements(), {
        id: "userAchievements",
        style: "SECTION",
    });
}
</script>
