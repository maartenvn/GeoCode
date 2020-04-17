<template>
    <v-container class="container--small">
        <!-- Loading -->
        <template v-if="currentUser.isLoading()"> </template>

        <!-- Data -->
        <template v-else-if="currentUser.isSuccess()">
            <v-tabs vertical c>
                <v-tab class="justify-start">
                    <v-icon left>mdi-account</v-icon>
                    Account settings
                </v-tab>

                <v-tab class="justify-start">
                    <v-icon left>mdi-lock</v-icon>
                    Password
                </v-tab>

                <v-tab-item class="profile__content">
                    <profile-account
                        :current-user="currentUser.requireData()"
                    />
                </v-tab-item>
            </v-tabs>
        </template>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { StoreGetter } from "@/store/decorators/StoreGetterDecorator";
import { EchoPromise } from "echofetch";
import User from "@/api/models/User";
import ProfileAccount from "@/components/view/profile/ProfileAccount.vue";
import ErrorPlaceholder from "@/components/error/ErrorPlaceholder.vue";

@Component({
    components: { ErrorPlaceholder, ProfileAccount },
})
export default class Profile extends Vue {
    /**
     * Logged in user.
     */
    @StoreGetter("session/currentUser")
    currentUser: EchoPromise<User>;
}
</script>

<style lang="scss">
.profile {
    &__content {
        margin-left: 25px;
    }
}
</style>
