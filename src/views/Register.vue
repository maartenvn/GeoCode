<template>
    <v-container class="container--small">
        <v-card :loading="loading">
            <v-card-title>
                Create a new account
            </v-card-title>

            <register-form
                :loading.sync="loading"
                :show-image="true"
                @registerSuccessAction="onRegisterSuccess"
                @loginClick="onLoginClick"
            />
        </v-card>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import RegisterForm from "@/components/view/register/RegisterForm.vue";

@Component({
    components: { RegisterForm },
})
export default class Register extends Vue {
    /**
     * If the form is loading.
     */
    loading: boolean;

    constructor() {
        super();

        this.loading = false;
    }

    /**
     * Navigate to the login page when the login button is clicked.
     */
    onLoginClick() {
        // Navigate to the login page.
        this.$router.push("/login");
    }

    /**
     * Navigate to the login page when the register succeeded.
     */
    onRegisterSuccess() {
        // Navigate to the login page.
        this.$router.push("/login");
    }
}
</script>
