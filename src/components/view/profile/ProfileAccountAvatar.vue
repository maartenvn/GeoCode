<template>
    <div class="avatar">
        <v-hover>
            <template v-slot:default="{ hover }">
                <v-avatar
                    :color="!avatarUrl ? 'primary' : ''"
                    size="100"
                    @click="openChangeAvatar"
                >
                    <img
                        v-if="_avatarUrl"
                        :src="_avatarUrl"
                        :alt="currentUser.username"
                    />

                    <span v-else class="white--text headline">
                        {{ currentUser.username.toUpperCase().charAt(0) }}
                    </span>

                    <!-- Hidden input for file -->
                    <input
                        ref="avatarImage"
                        type="file"
                        accept="image/*"
                        class="d-none"
                        @change="changeAvatar"
                    />

                    <v-fade-transition v-if="editing && !loading">
                        <v-overlay v-if="hover" class="avatar__hover" absolute>
                            CHANGE AVATAR
                        </v-overlay>
                    </v-fade-transition>
                </v-avatar>
            </template>
        </v-hover>

        <div v-if="editing" class="d-flex justify-center mt-2">
            <v-btn color="error" text @click="onDeleteAvatar">
                Delete
            </v-btn>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue } from "vue-property-decorator";
import { InputField } from "@/types/fields/InputField";
import User from "@/api/models/User";
import { Event } from "@/util/decorators/EventDecorator";

@Component
export default class ProfileAccountAvatar extends Vue {
    /**
     * Logged in user.
     */
    @Prop()
    currentUser: User;

    /**
     * If the profile update request is loading.
     */
    @Prop({ default: false })
    loading: boolean;

    /**
     * If editing is enabled.
     */
    @Prop({ default: false })
    editing: boolean;

    /**
     * Field containing the avatar.
     */
    @PropSync("avatarField", { default: () => new InputField({ value: null }) })
    _avatarField: InputField;

    /**
     * Avatar URL for the current user.
     */
    @PropSync("avatarUrl")
    _avatarUrl: string;

    /**
     * Action when the avatar "delete" button is pressed.
     */
    @Event()
    deleteAction: () => void;

    /**
     * Open the image selection menu.
     */
    openChangeAvatar() {
        if (this.editing) {
            const element = this.$refs.avatarImage as HTMLElement;
            element.click();
        }
    }

    /**
     * Update the local avatar URL as an example.
     */
    changeAvatar(event: Event) {
        const target = event.target as HTMLInputElement;

        if (target && target.files && target.files.length == 1) {
            const file = target.files[0];

            this._avatarField.value = file;
            this._avatarUrl = URL.createObjectURL(file);
        }
    }

    /**
     * Delete the avatar image
     */
    onDeleteAvatar() {
        // Call the delete avatar event.
        this.deleteAction();

        // Update the avatar URL.
        this._avatarUrl = "";
    }
}
</script>

<style lang="scss">
.avatar {
    margin-right: 20px;

    &__hover {
        cursor: pointer;
        background-color: rgba(0, 0, 0, 0.5);
    }
}
</style>
