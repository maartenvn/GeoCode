<template>
    <v-row>
        <!-- Account details -->
        <v-col cols="12">
            <div class="section__title">
                Account details
            </div>

            <v-card outlined>
                <v-card-text>
                    <v-row justify="space-between" align="center" no-gutters>
                        <v-col cols="auto">
                            <div>
                                <strong>USERNAME</strong>

                                <p>
                                    {{ currentUser.username }}
                                </p>
                            </div>

                            <div>
                                <strong>EMAIL</strong>

                                <p>
                                    {{ currentUser.email }}
                                </p>
                            </div>
                        </v-col>

                        <v-col cols="auto">
                            <profile-account-avatar
                                :current-user="currentUser"
                            />
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-col>

        <!-- Update account -->
        <v-col cols="12">
            <div class="section__title">
                Change account details
            </div>

            <v-form class="section__content" @submit.prevent>
                <!-- Username -->
                <v-text-field
                    v-model="fields.username.value"
                    :rules="fields.username.rules"
                    :error-messages="fields.username.error"
                    label="Name"
                    placeholder="Your display name"
                    :disabled="loading"
                    outlined
                    required
                />

                <!-- Email -->
                <v-text-field
                    v-model="fields.email.value"
                    :rules="fields.email.rules"
                    :error-messages="fields.email.error"
                    label="Email"
                    placeholder="Your email address"
                    :disabled="loading"
                    outlined
                    required
                />

                <v-row justify="end">
                    <v-col cols="auto">
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
                    </v-col>
                </v-row>
            </v-form>
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
    };

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
