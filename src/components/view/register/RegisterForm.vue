<template>
    <v-form @submit.prevent>
        <v-card-text>
            <p>
                Follow the steps below to create a new account.
            </p>

            <p style="font-size: 0.8em;">
                This site is protected by reCAPTCHA and the Google
                <a href="https://policies.google.com/privacy">Privacy Policy</a>
                and
                <a href="https://policies.google.com/terms">Terms of Service</a>
                apply.
            </p>

            <v-row>
                <v-col cols="12" :md="showImage ? 8 : 12">
                    <v-row>
                        <v-col>
                            <!-- Username -->
                            <v-text-field
                                v-model="fields.username.value"
                                :rules="fields.username.rules"
                                :error-messages="fields.username.error"
                                :disabled="_loading"
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
                                :disabled="_loading"
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
                                :disabled="_loading"
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
                                :error-messages="fields.passwordRepeat.error"
                                :disabled="_loading"
                                append-icon="mdi-lock"
                                label="Repeat password"
                                placeholder="Repeat the given password"
                                type="password"
                                outlined
                                required
                            />
                        </v-col>
                    </v-row>

                    <v-row style="padding-left: 12px;">
                        <v-checkbox v-model="privacy_agree" />
                        <p style="align-self: center; margin: 0px;">
                            I agree with the
                            <a href="privacypolicy" target="_blank"
                                >Privacy Policy</a
                            >
                        </p>
                    </v-row>

                    <v-card-actions>
                        <v-btn
                            @click="$emit('loginClick')"
                            color="primary"
                            text
                        >
                            Sign in instead
                        </v-btn>

                        <v-spacer />

                        <v-btn
                            color="primary"
                            depressed
                            @click="register"
                            :disabled="_loading || privacyAgree == false"
                            type="submit"
                        >
                            Create account
                        </v-btn>
                    </v-card-actions>
                </v-col>

                <v-col
                    v-if="showImage"
                    class="hidden-sm-and-down text-center"
                    cols="12"
                    md="4"
                >
                    <img src="@/assets/img/logo.svg" height="80%" />
                </v-col>
            </v-row>
        </v-card-text>
    </v-form>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue } from "vue-property-decorator";
import AuthService from "@/api/services/AuthService";
import { InputFields } from "@/types/fields/InputFields";
import { InputField } from "@/types/fields/InputField";
import { InputFieldUtil } from "@/util/InputFieldUtil";
import { CaptchaUtil } from "@/util/CaptchaUtil";
import { ErrorHandler } from "@/api/error/ErrorHandler";

@Component
export default class Register extends Vue {
    @Prop({ default: false })
    showImage: boolean;

    privacyAgree = false;

    /**
     * If the form is loading.
     */
    @PropSync("loading", { default: false })
    _loading: boolean;

    /**
     * Input fields values & properties.
     */
    fields: InputFields;

    constructor() {
        super();

        this.fields = {
            username: new InputField(),
            email: new InputField(),
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

    /**
     * Register the user.
     */
    register(): void {
        // Set loading.
        this._loading = true;

        // Execute the captcha.
        CaptchaUtil.execute("register").then((token) => {
            // Execute the register request.
            AuthService.register(
                Object.assign(InputFieldUtil.getValues(this.fields), {
                    captcha: token,
                })
            )
                .then(() => {
                    // Send confirmation message.
                    this.$store.dispatch("snackbar/open", {
                        message: "Account was successfully created",
                        color: "success",
                    });

                    this.$emit("registerSuccessAction");
                })
                .catch((error) => {
                    ErrorHandler.handle(
                        error,
                        {
                            style: "SNACKBAR",
                            id: "register",
                        },
                        this.fields
                    );
                })
                .finally(() => {
                    // Finish loading
                    this._loading = false;
                });
        });
    }
}
</script>
