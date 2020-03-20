<template>
    <v-container class="container--small">
        <v-row align="center" justify="center">
            <v-col cols="12" md="6">
                <v-card :loading="loading">
                    <v-card-title>
                        Login
                    </v-card-title>

                    <v-form @submit.prevent>
                        <v-card-text>
                            <p class="pb-4">
                                Login into your existing GeoCode account.
                            </p>

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

                            <!-- Password -->
                            <v-text-field
                                v-model="fields.password.value"
                                :rules="fields.password.rules"
                                :error-messages="fields.password.error"
                                :disabled="loading"
                                append-icon="mdi-lock"
                                label="Password"
                                placeholder="Enter your password"
                                type="password"
                                outlined
                                required
                            />
                        </v-card-text>

                        <v-card-actions>
                            <v-btn to="/register" color="primary" text>
                                Create an account
                            </v-btn>

                            <v-spacer />

                            <v-btn
                                color="primary"
                                depressed
                                @click="login"
                                :disabled="loading"
                                type="submit"
                            >
                                Login
                            </v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import {
    InputFields,
    InputField,
    getFieldValues,
    setFieldErrors,
    modifyGeneralError
} from "@/util/fieldsutil";
import { executeCaptcha } from "@/util/captchautil";
import UserService from "@/api/services/UserService";

@Component
export default class Login extends Vue {
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
            email: new InputField(),
            password: new InputField()
        };
    }

    /**
     * Login request
     */
    login(): void {
        // Set loading.
        this.loading = true;

        executeCaptcha("login")
            .then(token => {
                // Execute the login request.
                UserService.login(
                    Object.assign(getFieldValues(this.fields), {
                        captcha: token
                    })
                )
                    .then(data => {
                        // Send confirmation message.
                        this.$store.dispatch("snackbar/open", {
                            message: "Successfully logged in",
                            color: "success"
                        });

                        // Navigate to the home page.
                        this.$router.push("/");

                        // Update the current user inside the store.
                        this.$store.dispatch("session/fetch");
                    })
                    .catch(error => {
                        // Finish loading
                        this.loading = false;

                        this.$error(modifyGeneralError(error), {
                            style: "SNACKBAR",
                            id: "login"
                        });

                        // Handle field errors.
                        setFieldErrors(this.fields, error);
                    });
            })
            .finally(() => {
                // Finish loading
                this.loading = false;
            });
    }
}
</script>
