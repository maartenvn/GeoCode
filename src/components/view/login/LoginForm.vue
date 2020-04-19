<template>
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
                :disabled="_loading"
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
                :disabled="_loading"
                append-icon="mdi-lock"
                label="Password"
                placeholder="Enter your password"
                type="password"
                outlined
                required
            />
        </v-card-text>

        <v-card-actions>
            <v-btn @click="$emit('registerClick')" color="primary" text>
                Create an account
            </v-btn>

            <v-spacer />

            <v-btn
                color="primary"
                depressed
                @click="login"
                :disabled="_loading"
                type="submit"
            >
                Login
            </v-btn>
        </v-card-actions>
    </v-form>
</template>

<script lang="ts">
import { Component, PropSync, Vue } from "vue-property-decorator";
import AuthService from "@/api/services/AuthService";
import { InputFields } from "@/types/fields/InputFields";
import { InputField } from "@/types/fields/InputField";
import { CaptchaUtil } from "@/util/CaptchaUtil";
import { InputFieldUtil } from "@/util/InputFieldUtil";
import { ErrorHandler } from "@/api/error/ErrorHandler";

@Component
export default class Form extends Vue {
    @PropSync("loading", { default: false })
    _loading: boolean;

    /**
     * Input fields values & properties.
     */
    fields: InputFields;

    constructor() {
        super();

        this.fields = {
            email: new InputField(),
            password: new InputField(),
        };
    }

    /**
     * Login request
     */
    login(): void {
        // Set loading.
        this._loading = true;

        CaptchaUtil.execute("login").then((token) => {
            // Execute the login request.
            AuthService.login(
                Object.assign(InputFieldUtil.getValues(this.fields), {
                    captcha: token,
                })
            )
                .then((data) => {
                    // Finish loading
                    this._loading = false;

                    // Send confirmation message.
                    this.$store.dispatch("snackbar/open", {
                        message: "Successfully logged in",
                        color: "success",
                    });

                    this.$emit("loginSuccessAction");

                    // Update the current user inside the store.
                    this.$store.dispatch("session/fetch");
                })
                .catch((error) => {
                    // Finish loading
                    this._loading = false;

                    ErrorHandler.handle(
                        error,
                        {
                            id: "login",
                            style: "SNACKBAR",
                        },
                        this.fields
                    );
                });
        });
    }
}
</script>
