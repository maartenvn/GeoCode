<template>
    <v-row>
        <!-- Account details -->
        <v-col cols="12">
            <div class="section__title">
                Privacy & Data settings
            </div>

            <v-card outlined>
                <v-card-text>
                    <v-row>
                        <v-col cols="auto">
                            <h2>Select what data you want to delete:</h2>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-container fluid>
                            <v-checkbox
                                v-model="selected"
                                label="All your comments"
                                value="COMMENTS"
                                :disabled="loading"
                            />
                            <v-checkbox
                                v-model="selected"
                                label="All your ratings"
                                value="RATINGS"
                                :disabled="loading"
                            />
                            <v-checkbox
                                v-model="selected"
                                label="All your locations"
                                value="LOCATIONS"
                                :disabled="loading"
                            />
                            <v-checkbox
                                v-model="selected"
                                label="All your tours"
                                value="TOURS"
                                :disabled="loading"
                            />
                            <v-checkbox
                                v-model="selected"
                                label="All your visits to locations"
                                value="VISITS"
                                :disabled="loading"
                            />
                        </v-container>
                    </v-row>

                    <v-row>
                        <v-spacer />
                        <v-col cols="auto">
                            <v-btn
                                color="error"
                                depressed
                                :disabled="selected.length === 0"
                                @click="deleteData"
                            >
                                Delete selected data
                            </v-btn>
                        </v-col>
                    </v-row>

                    <v-divider class="mb-3" />

                    <v-row>
                        <v-col cols="auto">
                            <h2>
                                If you want to permanently delete your account:
                            </h2>
                        </v-col>
                        <v-spacer />
                        <v-col cols="auto">
                            <v-btn color="error" depressed @click="deleteUser">
                                Delete Account
                            </v-btn>
                        </v-col>
                    </v-row>

                    <v-divider class="mb-3" />

                    <v-row>
                        <v-col cols="auto">
                            <p>
                                View our Privacy Policy
                                <a href="/privacypolicy" target="_blank">
                                    here
                                </a>
                            </p>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { InputField } from "@/types/fields/InputField";
import { InputFields } from "@/types/fields/InputFields";
import { InputFieldUtil } from "@/util/InputFieldUtil";
import { ErrorHandler } from "@/api/error/ErrorHandler";
import AuthService from "@/api/services/AuthService";
import User from "@/api/models/User";
import UserService from "@/api/services/UserService";
import ProfileAccountAvatar from "@/components/view/profile/ProfileAccountAvatar.vue";
import { EchoError } from "echofetch";
import { UserUtil } from "@/util/UserUtil";
import ConfirmModal from "@/components/modal/ConfirmModal.vue";

@Component
export default class ProfilePrivacy extends Vue {
    selected = [];

    loading = false;

    deleteData() {
        this.$store.dispatch("modal/open", {
            component: ConfirmModal,
            componentPayload: {
                message: `Are you sure you want to delete this data? This is non-reversable!`,
                action: (instance: Vue) => {
                    instance.$set(instance, "loading", true);
                    this.selected.forEach((element) => {
                        UserService.deleteData({ type: element })
                            .then(() => {
                                // Close the modal.
                                this.$store.dispatch("modal/close");

                                // Send confirmation
                                this.$store.dispatch("snackbar/open", {
                                    message:
                                        "The data you selected has been deleted",
                                    color: "success",
                                });
                            })
                            .catch((error) => {
                                ErrorHandler.handle(error, {
                                    style: "SNACKBAR",
                                    id: "userDataDelete",
                                });
                            })
                            .finally(() => {
                                // Finish loading
                                instance.$set(instance, "loading", false);
                            });
                    });
                },
            },
        });
    }

    deleteUser() {
        this.$store.dispatch("modal/open", {
            component: ConfirmModal,
            componentPayload: {
                message: `Are you sure you want to delete your account? This is non-reversable!`,
                action: (instance: Vue) => {
                    // set loading
                    instance.$set(instance, "loading", true);
                    UserService.delete()
                        .then(() => {
                            // Close the modal.
                            this.$store.dispatch("modal/close");

                            // Refetch the profile information.
                            this.$store.dispatch("session/fetch");

                            // Redirect back to list of reported locations
                            this.$router.push({ name: "Home" });

                            // Send confirmation
                            this.$store.dispatch("snackbar/open", {
                                message: "Your account has been deleted",
                                color: "success",
                            });
                        })
                        .catch((error) => {
                            ErrorHandler.handle(error, {
                                style: "SNACKBAR",
                                id: "userDelete",
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
}
</script>
