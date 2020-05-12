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
                </v-card-title>

                <v-data-table
                    :headers="headers"
                    :items="users.data"
                    :search="tableSearch"
                >
                    <template v-slot:top>
                        <v-text-field
                            v-model="tableSearch"
                            prepend-icon="mdi-database-search"
                            label="Search for a user"
                            single-line
                            outlined
                            dense
                        />
                    </template>

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
                            :disabled="getImageURL(item) === '' || loading"
                            :loading="loading"
                        >
                            <v-icon color="error">mdi-image-remove</v-icon>
                        </v-btn>

                        <v-btn
                            :disabled="item.id < 0 || loading"
                            :loading="loading"
                            icon
                            @click="deleteUser(item)"
                        >
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
import ConfirmModal from "@/components/modal/ConfirmModal.vue";
import { ErrorHandler } from "@/api/error/ErrorHandler";
import { ArrayUtil } from "../../util/ArrayUtil";

@Component({
    components: {
        ErrorPlaceholder,
    },
})
export default class AdminUsers extends Vue {
    /*
     * Variable for search field
     */
    tableSearch = "";

    loading = false;

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

    /*
     * Use the image id to make a usable image url
     */
    getImageURL(user: User): string {
        if (user.avatar != null && user.avatar.id > 0) {
            return ImageUtil.getById(user.avatar.id);
        }
        return "";
    }

    deleteUser(user: User) {
        this.$store.dispatch("modal/open", {
            component: ConfirmModal,
            componentPayload: {
                message: `Are you sure you want to delete ${user.username}'s account?`,
                action: (instance: Vue) => {
                    instance.$set(instance, "loading", true);
                    UsersService.delete(user.id)
                        .then(() => {
                            user.id = -1;

                            // Close the modal.
                            this.$store.dispatch("modal/close");

                            // Remove the user from the table.
                            ArrayUtil.delete(this.users.requireData(), user);

                            // Send confirmation
                            this.$store.dispatch("snackbar/open", {
                                message: "User has been deleted",
                                color: "success",
                            });
                        })
                        .catch((error) => {
                            ErrorHandler.handle(error, {
                                style: "SNACKBAR",
                                id: "locationDelete",
                            });
                        })
                        .finally(() => {
                            // Finish loading
                            instance.$set(instance, "loading", false);
                        });
                },
            },
        });
    }

    removeImage(user: User) {
        this.$store.dispatch("modal/open", {
            component: ConfirmModal,
            componentPayload: {
                message: `Are you sure you want to remove ${user.username}'s profile picture?`,
                action: (instance: Vue) => {
                    instance.$set(instance, "loading", true);
                    UsersService.update(user.id, { avatarId: -1 })
                        .then(() => {
                            user.avatar.id = -1;

                            // Close the modal.
                            this.$store.dispatch("modal/close");

                            // Send confirmation
                            this.$store.dispatch("snackbar/open", {
                                message:
                                    "User's profile picture has been removed",
                                color: "success",
                            });
                        })
                        .catch((error) => {
                            ErrorHandler.handle(error, {
                                style: "SNACKBAR",
                                id: "locationDelete",
                            });
                        })
                        .finally(() => {
                            // Finish loading
                            instance.$set(instance, "loading", false);
                        });
                },
            },
        });
    }

    /*
     * Open a modal to show the avatar
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
