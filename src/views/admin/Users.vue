<template>
    <v-container class="container--small">
        <!-- Loading -->
        <template v-if="users.isLoading()">
            <v-skeleton-loader type="table" dense />
        </template>

        <!-- Data -->
        <template v-else-if="users.isSuccess()">
            <v-card flat>
                <v-card-title>
                    Users
                    <v-spacer />
                    <v-text-field
                        v-model="tableSearch"
                        append-icon="mdi-magnify"
                        label="Search users"
                        single-line
                        outlined
                        dense
                    ></v-text-field>
                </v-card-title>
                <v-data-table
                    :headers="headers"
                    :items="users.data"
                    :search="tableSearch"
                >
                    <template v-slot:item.avatar="{ item }">
                        <v-btn
                            depressed
                            :disabled="getImageURL(item) === ''"
                            @click="openImage(item)"
                        >
                            Show avatar
                        </v-btn>
                    </template>

                    <template v-slot:item.action="{ item }">
                        <v-btn
                            icon
                            @click="removeImage(item)"
                            :disabled="getImageURL(item) === ''"
                        >
                            <v-icon color="error">mdi-image-remove</v-icon>
                        </v-btn>

                        <v-btn icon @click="deleteUser(item)">
                            <v-icon color="error">mdi-delete</v-icon>
                        </v-btn>
                    </template>
                </v-data-table>
            </v-card>
        </template>

        <!-- Error -->
        <template v-else-if="users.isError()">
            <error-placeholder error-id="reports" />
        </template>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import UsersService from "@/api/services/UsersService";
import { RequestHandler } from "@/api/RequestHandler";
import ErrorPlaceholder from "@/components/error/ErrorPlaceholder.vue";
import { ImageUtil } from "@/util/ImageUtil.ts";
import User from "@/api/models/User";

@Component({
    components: {
        ErrorPlaceholder,
    },
})
export default class AdminUsers extends Vue {
    /*
     *   variable for search field
     */
    tableSearch = "";

    users = RequestHandler.handle(UsersService.getAll(), {
        id: "users",
        style: "SECTION",
        displayFullpage: true,
    });

    headers = [
        {
            text: "Username",
            value: "username",
        },
        {
            text: "Id",
            value: "id",
        },
        {
            text: "",
            value: "avatar",
            sortable: false,
        },
        {
            text: "",
            value: "action",
            sortable: false,
            align: "end",
        },
    ];

    // removeImage(user: User) {
    //     patch user so image is -1
    // }

    // deleteUser(user: User) {
    //     delete user
    // }

    /*
     *   use the image id to make a usable image url
     */
    getImageURL(user: User): string {
        if (user.avatar != null && user.avatar.id > 0) {
            return ImageUtil.getById(user.avatar.id);
        }
        return "";
    }

    /*
     *   open a modal to show the avatar
     */
    openImage(user: User) {
        this.$store.dispatch("modal/open", {
            component: () => import("@/components/modal/admin/ImageModal.vue"),
            componentPayload: {
                user,
            },
        });
    }
}
</script>
