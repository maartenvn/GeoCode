<template>
    <v-container class="container--small">
        <v-row align="center" justify="center">
            <v-col cols="12" md="6">
                <v-card :loading="loading">
                    <v-card-title>
                        Login
                    </v-card-title>

                    <login-form
                        :loading.sync="loading"
                        @loginSuccessAction="onLoginSuccess"
                        @registerClick="onRegisterClick"
                    />
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AuthService from "@/api/services/AuthService";
import { InputFields } from "@/types/fields/InputFields";
import { InputField } from "@/types/fields/InputField";
import { CaptchaUtil } from "@/util/CaptchaUtil";
import { InputFieldUtil } from "@/util/InputFieldUtil";
import { ErrorHandler } from "@/api/error/ErrorHandler";
import LoginForm from "@/components/view/login/LoginForm.vue";

@Component({
    components: {
        LoginForm,
    },
})
export default class Login extends Vue {
    /**
     * If the form is loading.
     */
    loading: boolean;

    constructor() {
        super();

        this.loading = false;
    }

    /**
     * Navigate to the register page when the register button is clicked.
     */
    onRegisterClick() {
        // Navigate to the register page.
        this.$router.push("/register");
    }

    /**
     * Navigate to the home page when the login succeeded.
     */
    onLoginSuccess() {
        // Navigate to the home page.
        this.$router.push("/");
    }
}
</script>
