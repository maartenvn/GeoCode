<template>
    <v-container class="container--small">
        <v-card :loading="loading">
            <v-card-title>
                Create a new account
            </v-card-title>

            <v-card-text>
                <p>
                    Follow the steps below to create a new account.
                </p>

                <p style="font-size: 0.8em;">
                    This site is protected by reCAPTCHA and the Google
                    <a href="https://policies.google.com/privacy"
                        >Privacy Policy</a
                    >
                    and
                    <a href="https://policies.google.com/terms"
                        >Terms of Service</a
                    >
                    apply.
                </p>

                <v-form @submit.prevent>
                    <v-row>
                        <v-col cols="12" md="8">
                            <v-row>
                                <v-col>
                                    <!-- Username -->
                                    <v-text-field
                                        v-model="fields.username.value"
                                        :rules="fields.username.rules"
                                        :error-messages="fields.username.error"
                                        :disabled="loading"
                                        append-icon="mdi-account-box"
                                        label="Name"
                                        placeholder="Please enter your name"
                                        hint="You can use letters, numbers, spaces, underscores & hyphens."
                                        persistent-hint
                                        outlined
                                        required
                                    />
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-col>
                                    <!-- Email -->
                                    <v-text-field
                                        v-model="fields.email.value"
                                        :rules="fields.email.rules"
                                        :error-messages="fields.email.error"
                                        :disabled="loading"
                                        append-icon="mdi-email"
                                        label="Email"
                                        placeholder="Please enter your email address"
                                        type="email"
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
                                        label="Password"
                                        placeholder="Choose a password"
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
                                        :error-messages="
                                            fields.passwordRepeat.error
                                        "
                                        :disabled="loading"
                                        append-icon="mdi-lock"
                                        label="Repeat password"
                                        placeholder="Repeat the given password"
                                        type="password"
                                        outlined
                                        required
                                    />
                                </v-col>
                            </v-row>

                            <v-card-actions>
                                <v-btn to="/login" color="primary" text>
                                    Sign in instead
                                </v-btn>

                                <v-spacer />

                                <v-btn
                                    color="primary"
                                    depressed
                                    @click="register"
                                    :disabled="loading"
                                    type="submit"
                                >
                                    Create account
                                </v-btn>
                            </v-card-actions>
                        </v-col>

                        <v-col
                            class="hidden-sm-and-down text-center"
                            cols="12"
                            md="4"
                        >
                            <img src="@/assets/img/logo.svg" height="80%" />
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AuthService from "@/api/services/AuthService";
import { InputFields } from "@/types/fields/InputFields";
import { InputField } from "@/types/fields/InputField";
import { InputFieldUtil } from "@/util/InputFieldUtil";
import { CaptchaUtil } from "@/util/CaptchaUtil";
import { ErrorHandler } from "@/api/error/ErrorHandler";

@Component
export default class Register extends Vue {
    /**
     * If the form is loading.
     */
    loading: boolean;

    /**
     * Input fields values & properties.
     */
    fields: InputFields;

    constructor() {
        super();

        this.loading = false;
        this.fields = {
            username: new InputField(),
            email: new InputField(),
            password: new InputField(),
            passwordRepeat: new InputField({
                rules: [this.passwordConfirmationRule]
            })
        };
    }

    /**
     * Rule: Check if both passwords are the same.
     */
    get passwordConfirmationRule(): Function {
        return (value: string) =>
            this.fields.password.value === this.fields.passwordRepeat.value ||
            "Passwords didn't match, try again.";
    }

    /**
     * Register the user.
     */
    register(): void {
        // Set loading.
        this.loading = true;

        // Execute the captcha.
        CaptchaUtil.execute("register")
            .then(token => {
                // Execute the register request.
                AuthService.register(
                    Object.assign(InputFieldUtil.getValues(this.fields), {
                        captcha: token
                    })
                )
                    .then(data => {
                        // Finish loading
                        this.loading = false;

                        // Send confirmation message.
                        this.$store.dispatch("snackbar/open", {
                            message: "Account was succesfully created",
                            color: "success"
                        });

                        // Navigate to the login page.
                        this.$router.push("/login");
                    })
                    .catch(error => {
                        // Finish loading
                        this.loading = false;

                        ErrorHandler.handle(
                            error,
                            {
                                style: "SNACKBAR",
                                id: "register"
                            },
                            this.fields
                        );
                    });
            })
            .finally(() => {
                // Finish loading
                this.loading = false;
            });
    }
}
</script>
