<template>
    <v-col cols="auto">
        <!-- Loading -->
        <template v-if="loading">
            <v-skeleton-loader type="image" dense height="100" width="100" />
        </template>

        <!-- Data -->
        <template v-else>
            <!-- Tooltip -->
            <v-tooltip top>
                <span>Visit Australia</span>

                <template v-slot:activator="{ on }">
                    <v-img
                        class="badge"
                        v-on="on"
                        src="https://image.flaticon.com/icons/svg/1411/1411219.svg"
                        height="100"
                        width="100"
                        @click="openAchievement()"
                    >
                        <template v-slot:placeholder>
                            <v-skeleton-loader
                                type="image"
                                dense
                                height="100"
                                width="100"
                            />
                        </template>
                    </v-img>
                </template>
            </v-tooltip>
        </template>
    </v-col>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import AchievementModal from "@/components/modal/achievement/AchievementModal.vue";
import Achievement from "@/api/models/Achievement";

@Component
export default class AchievementBadge extends Vue {
    /**
     * If the badge is loading.
     */
    @Prop({ default: false })
    loading: boolean;

    /**
     * Achievement to display.
     */
    @Prop()
    achievement: Achievement;

    /**
     * If the achievement has been achieved.
     */
    @Prop({ default: false })
    isAchieved: boolean;

    /**
     * Open a modal containing the achievement information.
     */
    openAchievement() {
        this.$store.dispatch("modal/open", {
            component: AchievementModal,
            componentPayload: {
                achievement: this.achievement,
                isAchieved: this.isAchieved,
            },
        });
    }
}
</script>

<style>
.badge {
    cursor: pointer;
}
</style>
