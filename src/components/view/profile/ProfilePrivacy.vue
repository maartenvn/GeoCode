<template>
    <v-row>
        <!-- Account details -->
        <v-col cols="12">
            <div class="section__title">
                Privacy & Data
            </div>

            <v-card outlined>
                <v-card-text>
                    <h3>Select data to delete:</h3>

                    <v-row>
                        <v-col>
                            <v-checkbox
                                v-model="selected"
                                label="Comments"
                                value="COMMENTS"
                                :disabled="loading"
                            />
                            <v-checkbox
                                v-model="selected"
                                label="Ratings"
                                value="RATINGS"
                                :disabled="loading"
                            />
                            <v-checkbox
                                v-model="selected"
                                label="Locations"
                                value="LOCATIONS"
                                :disabled="loading"
                            />
                            <v-checkbox
                                v-model="selected"
                                label="Tours"
                                value="TOURS"
                                :disabled="loading"
                            />
                            <v-checkbox
                                v-model="selected"
                                label="Visits to locations"
                                value="VISITS"
                                :disabled="loading"
                            />
                        </v-col>
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
                            <h3>
                                Permanently delete your account
                            </h3>
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
                                View our
                                <a href="/privacypolicy" target="_blank">
                                    Privacy Policy
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
import { Component, Vue } from "vue-property-decorator";
import { ErrorHandler } from "@/api/error/ErrorHandler";
import UserService from "@/api/services/UserService";
import ConfirmModal from "@/components/modal/ConfirmModal.vue";

@Component
export default class ProfilePrivacy extends Vue {
    selected = [];

    loading = false;

    async deleteData() {
        await this.$store.dispatch("modal/open", {
            component: ConfirmModal,
            componentPayload: {
                message: `Are you sure you want to delete this data? This is non-reversable!`,
                action: (instance: Vue) => {
                    instance.$set(instance, "loading", true);

                    this.selected.forEach(async (element) => {
                        try {
                            await UserService.deleteData({ type: element });

                            // Finish loading
                            instance.$set(instance, "loading", false);

                            // Close the modal.
                            await this.$store.dispatch("modal/close");

                            // Send confirmation
                            await this.$store.dispatch("snackbar/open", {
                                message:
                                    "The data you selected has been deleted",
                                color: "success",
                            });

                            // Clear selected.
                            this.selected = [];
                        } catch (error) {
                            ErrorHandler.handle(error, {
                                style: "SNACKBAR",
                                id: "userDataDelete",
                            });
                        }
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
