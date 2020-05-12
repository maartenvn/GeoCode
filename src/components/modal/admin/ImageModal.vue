<template>
    <v-card>
        <v-card-title>
            {{ payload.user.username }}'s Avatar

            <v-spacer />

            <v-btn icon @click="close">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-card-title>

        <v-card-text>
            <img :src="getImageURL(payload.user)" />
        </v-card-text>
    </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import User from "@/api/models/User";
import { ImageUtil } from "@/util/ImageUtil.ts";

@Component
export default class ConfirmModal extends Vue {
    /**
     * Payload, passed when opening the modal.
     */
    @Prop()
    payload: {
        user: User;
    };

    /**
     * Close the modal.
     */
    close() {
        this.$store.dispatch("modal/close");
    }

    /*
     *   use the image id to make a usable image url
     */
    getImageURL(user: User): string {
        if (user.avatar != null && user.avatar.id > 0) {
            return ImageUtil.getById(user.avatar.id);
        }
        return "";
    }
}
</script>

<style lang="scss">
img {
    max-width: 25rem;
    max-heigth: 25rem;
    display: block;
    margin-left: auto;
    margin-right: auto;
}
</style>
