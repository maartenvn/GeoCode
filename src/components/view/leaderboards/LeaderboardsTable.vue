<template>
    <div>
        <!-- Loading -->
        <template v-if="users.isLoading()">
            <v-skeleton-loader dense type="table" />
        </template>

        <!-- Data -->
        <template v-else-if="users.isSuccess()">
            <v-data-table
                :headers="tableHeaders"
                :search="tableSearch"
                :items="users.data"
                sort-by="value"
            >
                <template v-slot:top>
                    <v-text-field
                        v-model="tableSearch"
                        prepend-icon="mdi-account"
                        label="Search for a user"
                        single-line
                        outlined
                        dense
                    />
                </template>

                <template v-slot:no-data>
                    No users available in this leaderboard
                </template>

                <template v-slot:no-results>
                    No users found with the given parameters
                </template>

                <template v-slot:item.avatar="{ item }">
                    <user-avatar
                        :username="item.user.username"
                        :avatar-url="getAvatarUrl(user)"
                    />
                </template>
            </v-data-table>
        </template>

        <!-- Error -->
        <template v-else-if="users.isError()">
            <error-placeholder error-id="leaderboard" />
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { EchoPromise } from "echofetch";
import ErrorPlaceholder from "@/components/error/ErrorPlaceholder.vue";
import UserAvatar from "@/components/user/UserAvatar.vue";
import User from "@/api/models/User";
import { UserUtil } from "@/util/UserUtil";
import LeaderboardUser from "@/api/models/LeaderboardUser";
import { RequestHandler } from "@/api/RequestHandler";

@Component({
    components: { UserAvatar, ErrorPlaceholder },
})
export default class LeaderboardsTable extends Vue {
    /**
     * Function to obtain the list with users.
     */
    @Prop()
    usersFunction: (limit: number) => EchoPromise<Array<LeaderboardUser>>;

    /**
     * List with users.
     */
    users: EchoPromise<Array<LeaderboardUser>>;

    /**
     * List with headers for the Vuetify data table.
     */
    tableHeaders = [
        {
            text: "",
            value: "avatar",
        },

        {
            text: "Username",
            value: "user.username",
        },

        {
            text: "Score",
            value: "value",
        },
    ];

    /**
     * Value of the search field.
     */
    tableSearch = "";

    constructor() {
        super();

        // Fetch the users.
        this.users = RequestHandler.handle(this.usersFunction(100), {
            id: "leaderboard",
            style: "SECTION",
        });
    }

    /**
     * Get the avatar URL for a specific user.
     * @param user
     */
    getAvatarUrl(user: User): string {
        return UserUtil.getAvatarUrl(user);
    }
}
</script>
