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
                <span>{{ achievement.name }}</span>

                <template v-slot:activator="{ on }">
                    <v-img
                        class="badge"
                        v-on="on"
                        :src="imageURL"
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
import { ImageUtil } from "@/util/ImageUtil";

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
     * Get the image URL of the achievement.
     */
    get imageURL(): string {
        return ImageUtil.getById(
            this.achievement.image ? this.achievement.image.id : -1
        );
    }

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
