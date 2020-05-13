<template>
    <v-card>
        <v-card-title>
            <v-spacer />

            <v-btn icon @click="close">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-card-title>

        <v-card-text class="text-center">
            <v-img
                :style="!payload.isAchieved ? 'filter: grayscale(100%);' : ''"
                class="badge"
                :src="imageURL"
                width="150"
                height="150"
            />

            <h2 class="pb-2">{{ payload.achievement.name }}</h2>

            <!-- Description -->
            <div v-html="payload.achievement.description" />

            <!-- Achieved -->
            <p v-if="payload.isAchieved" style="color: green;">
                <b>Earned at: </b> {{ achievedDate }}
            </p>

            <!-- Not achieved -->
            <p v-else style="color: red;">
                <b>Not yet unlocked!</b>
            </p>
        </v-card-text>
    </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Achievement from "@/api/models/Achievement";
import { ImageUtil } from "@/util/ImageUtil";

@Component
export default class AchievementModal extends Vue {
    /**
     * Payload, passed when opening the modal.
     */
    @Prop()
    payload: {
        achievement: Achievement;
        isAchieved: boolean;
    };

    /**
     * Close the modal.
     */
    close() {
        this.$store.dispatch("modal/close");
    }

    /**
     * Get the image URL for the given achievement.
     */
    get imageURL(): string {
        return ImageUtil.getById(
            this.payload.achievement.image
                ? this.payload.achievement.image.id
                : -1
        );
    }

    get achievedDate(): string {
        if (this.payload.achievement.achievedAt) {
            const date = new Date(this.payload.achievement.achievedAt);

            return date.toLocaleDateString();
        }

        return "never";
    }
}
</script>

<style lang="scss">
.badge {
    margin: auto auto 40px;
}
</style>
