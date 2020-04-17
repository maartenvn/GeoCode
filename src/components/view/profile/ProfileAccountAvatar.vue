<template>
    <v-hover>
        <template v-slot:default="{ hover }">
            <v-avatar color="primary" size="100">
                <img
                    v-if="currentUser.avatarUrl"
                    :src="currentUser.avatarUrl"
                    :alt="currentUser.username"
                />

                <span v-else class="white--text headline">
                    {{ currentUser.username.toUpperCase().charAt(0) }}
                </span>

                <v-fade-transition>
                    <v-overlay v-if="hover" absolute color="#036358">
                        CHANGE AVATAR
                    </v-overlay>
                </v-fade-transition>
            </v-avatar>
        </template>
    </v-hover>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { InputField } from "@/types/fields/InputField";
import User from "@/api/models/User";
import UserService from "@/api/services/UserService";
import { InputFieldUtil } from "@/util/InputFieldUtil";
import { ErrorHandler } from "@/api/error/ErrorHandler";

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
    loading = false;

    /**
     * Update the profile settings that have changed on the page.
     */
    updateProfile() {
        this.loading = true;

        UserService.update(InputFieldUtil.getValues(this.fields))
            .then((_) => {
                // Send confirmation message.
                this.$store.dispatch("snackbar/open", {
                    message: "Successfully updated profile",
                    color: "success",
                });

                // Refetch the profile information.
                this.$store.dispatch("session/fetch");
            })
            .catch((error) => {
                // Handle field errors.
                ErrorHandler.handle(
                    error,
                    {
                        style: "SNACKBAR",
                        id: "profileUpdate",
                    },
                    this.fields
                );
            })
            .catch(() => (this.loading = false));
    }
}
</script>
