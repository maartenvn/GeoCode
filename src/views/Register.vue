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

                <v-form>
                    <v-row>
                        <v-col cols="12" sm="8">
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
                                >
                                    Create account
                                </v-btn>
                            </v-card-actions>
                        </v-col>

                        <v-col class="d-flex justify-center" cols="12" sm="4">
                            <img src="@/assets/img/logo.svg" height="80%" />
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { InputFields, InputField, getFieldValues } from "@/util/fieldsutil";
import { load } from "recaptcha-v3";
import { registerUser } from "../data/user";

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
            passwordRepeat: new InputField([this.passwordConfirmationRule])
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

        // Load the ReCaptcha.
        load(process.env.VUE_APP_RECAPTCHA_KEY).then(recaptcha => {
            recaptcha
                .execute("register")
                .then(token => {
                    // Execute the register request.
                    registerUser(
                        Object.assign(getFieldValues(this.fields), {
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
                            this.$error(error, {
                                style: "SNACKBAR",
                                id: "register"
                            });

                            // Finish loading
                            this.loading = false;
                        });
                })
                .catch(error => {
                    // Finish loading
                    this.loading = false;

                    // Captcha failed to load. Throw an error.
                    this.$error(
                        {
                            message:
                                "Unable to progress captcha. Try again later.",
                            stacktrace: error
                        },
                        {
                            style: "SNACKBAR",
                            id: "register",
                            displayConsole: true
                        }
                    );
                });
        });
    }
}
</script>
