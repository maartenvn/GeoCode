<template>
    <v-row>
        <!-- Account details -->
        <v-col cols="12">
            <div class="section__title">
                Update Password
            </div>

            <v-card outlined>
                <v-card-text>
                    <v-row>
                        <v-col>
                            <!-- Password -->
                            <v-text-field
                                v-model="fields.oldPassword.value"
                                :rules="fields.oldPassword.rules"
                                :error-messages="fields.oldPassword.error"
                                :disabled="loading"
                                append-icon="mdi-lock"
                                label="Current Password"
                                placeholder="Enter your old password"
                                type="password"
                                outlined
                                required
                            />
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="12" sm="6">
                            <!-- Password -->
                            <v-text-field
                                v-model="fields.password.value"
                                :rules="fields.password.rules"
                                :error-messages="fields.password.error"
                                :disabled="loading"
                                append-icon="mdi-lock"
                                label="New Password"
                                placeholder="Choose a new password"
                                type="password"
                                outlined
                                required
                            />
                        </v-col>

                        <v-col cols="12" sm="6">
                            <!-- Password -->
                            <v-text-field
                                v-model="fields.passwordRepeat.value"
                                :rules="fields.passwordRepeat.rules"
                                :error-messages="fields.passwordRepeat.error"
                                :disabled="loading"
                                append-icon="mdi-lock"
                                label="Repeat New Password"
                                placeholder="Repeat your new password"
                                type="password"
                                outlined
                                required
                            />
                        </v-col>
                    </v-row>
                </v-card-text>

                <v-card-actions>
                    <v-spacer />

                    <v-btn
                        color="primary"
                        @click="changePassword"
                        :disabled="loading"
                        :loading="loading"
                        depressed
                    >
                        Update Password
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { InputField } from "@/types/fields/InputField";
import { InputFields } from "@/types/fields/InputFields";
import { InputFieldUtil } from "@/util/InputFieldUtil";
import { ErrorHandler } from "@/api/error/ErrorHandler";
import AuthService from "@/api/services/AuthService";

@Component
export default class ProfilePassword extends Vue {
    loading = false;

    /**
     * Input fields values & properties.
     */
    fields: InputFields;

    constructor() {
        super();

        this.fields = {
            oldPassword: new InputField(),
            password: new InputField(),
            passwordRepeat: new InputField({
                rules: [this.passwordConfirmationRule],
            }),
        };
    }

    /**
     * Rule: Check if both passwords are the same.
     */
    get passwordConfirmationRule(): Function {
        return () =>
            this.fields.password.value === this.fields.passwordRepeat.value ||
            "Passwords didn't match, try again.";
    }

    changePassword(): void {
        // Set loading.
        this.loading = true;

        // Execute the changePassword request.
        AuthService.changePassword(
            Object.assign(InputFieldUtil.getValues(this.fields))
        )
            .then(() => {
                // Send confirmation message.
                this.$store.dispatch("snackbar/open", {
                    message: "Your password was changed",
                    color: "success",
                });
            })
            .catch((error) => {
                ErrorHandler.handle(
                    error,
                    {
                        style: "SNACKBAR",
                        id: "passwordChange",
                    },
                    this.fields
                );
            })
            .finally(() => {
                // Finish loading
                this.loading = false;
            });
    }
}
</script>
