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
                sort-field="position"
                sort-desc="true"
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

                <template v-slot:item.position="{ item }">
                    <template v-if="getPosition(item) === 1">
                        <img
                            class="leaderboard__medal"
                            src="@/assets/img/medal_first.svg"
                        />
                    </template>

                    <template v-else-if="getPosition(item) === 2">
                        <img
                            class="leaderboard__medal"
                            height="40"
                            src="@/assets/img/medal_second.svg"
                        />
                    </template>

                    <template v-else-if="getPosition(item) === 3">
                        <img
                            class="leaderboard__medal"
                            height="40"
                            src="@/assets/img/medal_third.svg"
                        />
                    </template>

                    <template v-else>
                        <strong>{{ getPosition(item) }}</strong>
                    </template>
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
            text: "#",
            value: "position",
            width: "50px",
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

    /**
     * Get the position of a leaderboard user in the list.
     * @param leaderboardUser
     */
    getPosition(leaderboardUser: LeaderboardUser): number {
        if (this.users.isSuccess()) {
            return this.users.requireData().indexOf(leaderboardUser) + 1;
        }

        return -1;
    }
}
</script>

<style lang="scss">
.leaderboard {
    &__medal {
        height: 50px;
        padding: 5px;
    }
}
</style>
