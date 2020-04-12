<template>
    <div>
        <v-card-text>
            <p>
                You will <strong>need an account</strong> to leave a comment on
                the guestbook, where you can see messages from visitors to that
                location.
            </p>

            <p>
                Login or create an account to continue!
            </p>
        </v-card-text>

        <v-tabs v-model="tab" grow>
            <v-tab key="login">Login</v-tab>
            <v-tab key="register">Register</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
            <v-tab-item key="login">
                <login-form @registerClick="onRegisterClick" />
            </v-tab-item>

            <v-tab-item key="register">
                <register-form @loginClick="onLoginClick" />
            </v-tab-item>
        </v-tabs-items>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import LoginForm from "@/components/view/login/LoginForm.vue";
import RegisterForm from "@/components/view/register/RegisterForm.vue";

@Component({
    components: { RegisterForm, LoginForm }
})
export default class VisitAuth extends Vue {
    @Prop()
    location: Location;

    /**
     * Current value of the tab menu.
     */
    tab = 0;

    /**
     * Navigate to the login tab when the login button is clicked.
     */
    onLoginClick() {
        this.tab = 0;
    }

    /**
     * Navigate to the register tab when the login button is clicked.
     */
    onRegisterClick() {
        this.tab = 1;
    }
}
</script>
