<template>
    <v-row>
        <!-- Account details -->
        <v-col cols="12">
            <div class="section__title">
                Account details
            </div>

            <v-card outlined>
                <v-form @submit.prevent>
                    <v-card-text>
                        <v-row no-gutters>
                            <!-- Avatar -->
                            <profile-account-avatar
                                :current-user="currentUser"
                                :editing="editing"
                                :avatar-field.sync="fields.avatar"
                            />

                            <!-- Data -->
                            <v-col>
                                <!-- Username -->
                                <div>
                                    <v-text-field
                                        v-if="editing"
                                        v-model="fields.username.value"
                                        :rules="fields.username.rules"
                                        :error-messages="fields.username.error"
                                        label="Name"
                                        placeholder="Your display name"
                                        :disabled="loading"
                                        outlined
                                        required
                                    />

                                    <template v-else>
                                        <strong>USERNAME</strong>

                                        <p>
                                            {{ currentUser.username }}
                                        </p>
                                    </template>
                                </div>

                                <!-- Email -->
                                <div>
                                    <v-text-field
                                        v-if="editing"
                                        v-model="fields.email.value"
                                        :rules="fields.email.rules"
                                        :error-messages="fields.email.error"
                                        label="Email"
                                        placeholder="Your email address"
                                        :disabled="loading"
                                        outlined
                                        required
                                    />

                                    <template v-else>
                                        <strong>EMAIL</strong>

                                        <p>
                                            {{ currentUser.email }}
                                        </p>
                                    </template>
                                </div>
                            </v-col>

                            <template v-if="!editing">
                                <v-spacer />

                                <!-- Edit button -->
                                <v-btn
                                    color="primary"
                                    depressed
                                    @click="editing = true"
                                >
                                    Edit account
                                </v-btn>
                            </template>
                        </v-row>
                    </v-card-text>

                    <v-card-actions v-if="editing">
                        <v-spacer />

                        <v-btn color="error" text @click="cancelEdit">
                            Cancel
                        </v-btn>

                        <v-btn
                            @click="updateProfile"
                            type="submit"
                            color="primary"
                            :disabled="loading"
                            :loading="loading"
                            depressed
                        >
                            Save changes
                        </v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { InputField } from "@/types/fields/InputField";
import { InputFieldUtil } from "@/util/InputFieldUtil";
import { ErrorHandler } from "@/api/error/ErrorHandler";
import User from "@/api/models/User";
import UserService from "@/api/services/UserService";
import ProfileAccountAvatar from "@/components/view/profile/ProfileAccountAvatar.vue";
import { EchoError } from "echofetch";

@Component({
    components: { ProfileAccountAvatar },
})
export default class ProfileAccount extends Vue {
    /**
     * Logged in user.
     */
    @Prop()
    currentUser: User;

    /**
     * Input fields values & properties.
     */
    fields = {
        username: new InputField({ value: this.currentUser.username }),
        email: new InputField({ value: this.currentUser.email }),
        avatar: new InputField({ value: null }),
    };

    /**
     * If the profile update request is loading.
     */
    loading = false;

    /**
     * If editing is enabled for the profile.
     */
    editing = false;

    /**
     * Cancel the changes of the profile.
     */
    cancelEdit() {
        // Reset the fields
        this.fields.username.value = this.currentUser.username;
        this.fields.email.value = this.currentUser.email;

        // Disable editing
        this.editing = false;
    }

    /**
     * Update the profile settings that have changed on the page.
     */
    async updateProfile() {
        this.loading = true;

        // Upload the avatar image, when present.
        if (this.fields.avatar.value) {
            const file = this.fields.avatar.value as File;

            try {
                await UserService.updateAvatar(file);
            } catch (err) {
                // Handle the error.
                const error = {
                    message: "Unable to upload image. Try again!",
                } as EchoError;

                ErrorHandler.handle(error, {
                    id: "reportUploadImage",
                    style: "SNACKBAR",
                });

                this.loading = false;

                return;
            }
        }

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
