<template>
    <v-container class="container--small">
        <!-- Loading -->
        <template v-if="currentUser.isLoading()">
            <v-skeleton-loader type="article" style="margin-left: 175px;" />
        </template>

        <!-- Data -->
        <template v-else-if="currentUser.isSuccess()">
            <v-tabs :vertical="$vuetify.breakpoint.mdAndUp" show-arrows>
                <v-tab class="justify-start">
                    <v-icon left>mdi-account</v-icon>
                    Account settings
                </v-tab>

                <v-tab class="justify-start">
                    <v-icon left>mdi-lock</v-icon>
                    Password
                </v-tab>

                <v-tab class="justify-start">
                    <v-icon left>mdi-shield</v-icon>
                    Privacy & data
                </v-tab>

                <v-tab-item class="ml-md-4">
                    <profile-account
                        :current-user="currentUser.requireData()"
                    />

                    <profile-account-achievements
                        :current-user="currentUser.requireData()"
                    />
                </v-tab-item>

                <v-tab-item class="ml-md-4">
                    <profile-password />
                </v-tab-item>

                <v-tab-item class="ml-md-4">
                    <profile-privacy />
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
import ProfilePassword from "@/components/view/profile/ProfilePassword.vue";
import ProfilePrivacy from "@/components/view/profile/ProfilePrivacy.vue";
import ErrorPlaceholder from "@/components/error/ErrorPlaceholder.vue";
import ProfileAccountAchievements from "@/components/view/profile/ProfileAccountAchievements.vue";

@Component({
    components: {
        ErrorPlaceholder,
        ProfileAccount,
        ProfilePassword,
        ProfilePrivacy,
        ProfileAccountAchievements,
    },
})
export default class Profile extends Vue {
    /**
     * Logged in user.
     */
    @StoreGetter("session/currentUser")
    currentUser: EchoPromise<User>;
}
</script>
