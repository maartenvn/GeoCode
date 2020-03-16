<template>
    <v-container class="container--small">
        <v-row align="center" justify="center">
            <v-col cols="12" md="6">
                <v-card class="text-center">
                    <v-card-title class="justify-center">
                        Logging out...
                    </v-card-title>

                    <v-card-text>
                        <p>
                            You are being logged out, please wait...
                        </p>

                        <div class="logout__progress">
                            <v-progress-circular
                                class="logout__progress__loader"
                                :size="75"
                                color="primary"
                                indeterminate
                            />
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { logoutUser } from "../data/user";

@Component
export default class Logout extends Vue {
    created() {
        // Attempt to logout the current user.
        logoutUser().then(_ => {
            // Navigate to the home page.
            this.$router.push("/");
        });
    }
}
</script>

<style lang="scss">
.logout {
    &__progress {
        height: 200px;
        width: 100%;
        display: flex;

        &__loader {
            margin: auto;
        }
    }
}
</style>
