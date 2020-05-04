<template>
    <v-avatar :color="!avatarUrl ? 'primary' : ''">
        <img v-if="avatarUrl" :src="avatarUrl" :alt="username" />

        <span v-else class="white--text headline">
            {{ username.toUpperCase().charAt(0) }}
        </span>
    </v-avatar>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class UserAvatar extends Vue {
    /**
     * Name of the user.
     */
    @Prop()
    username: string;

    /**
     * Url of the avatar of the user.
     * Can be empty for placeholder.
     */
    @Prop()
    avatarUrl: string;
}
</script>
