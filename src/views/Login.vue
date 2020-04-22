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
