<template>
    <v-container class="container--small">
        <profile-account-achievements :current-user="currentUser" />
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { StoreGetter } from "@/store/decorators/StoreGetterDecorator";
import { EchoPromise } from "echofetch";
import User from "@/api/models/User";
import ProfileAccountAchievements from "@/components/view/profile/ProfileAccountAchievements.vue";

@Component({
    components: { ProfileAccountAchievements },
})
export default class ProfileAchievements extends Vue {
    /**
     * Logged in user.
     */
    @StoreGetter("session/currentUser")
    currentUser: EchoPromise<User>;
}
</script>
