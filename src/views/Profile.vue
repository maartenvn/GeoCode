<template>
    <v-container class="container--small">
        <!-- Loading -->
        <template v-if="currentUser.loading"> </template>

        <!-- Data -->
        <template v-else-if="currentUser.data">
            <v-row align="center" justify="center">
                <v-col class="section" cols="12" md="6">
                    <div class="section__title">
                        Your profile
                    </div>

                    <v-form class="section__content" @submit.prevent>
                        <!-- Username -->
                        <v-text-field
                            v-model="fields.username.value"
                            :rules="fields.username.rules"
                            :error-messages="fields.username.error"
                            label="Name"
                            placeholder="Your display name"
                            outlined
                            required
                        />

                        <!-- Email -->
                        <v-text-field
                            v-model="fields.email.value"
                            :rules="fields.email.rules"
                            :error-messages="fields.email.error"
                            label="Email"
                            placeholder="Your email address"
                            outlined
                            required
                        />

                        <v-row justify="end">
                            <v-col cols="auto">
                                <v-btn
                                    @click="updateProfile"
                                    type="submit"
                                    color="primary"
                                    depressed
                                >
                                    Save changes
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-col>
            </v-row>
        </template>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { InputFields, InputField, getFieldValues } from "../util/fieldsutil";
import { StoreGetter } from "../store/decorator";
import Query from "../data/struct/Query";
import User from "../data/models/User";
import { updateUser } from "../data/user";
import { reloadRoute } from "../util/routerutil";

@Component
export default class Profile extends Vue {
    /**
     * Input fields values & properties.
     */
    fields: InputFields;

    /**
     * Logged in user.
     */
    @StoreGetter("session/currentUser")
    currentUser: Query<User>;

    constructor() {
        super();

        this.fields = {
            username: new InputField(),
            email: new InputField()
        };
    }

    /**
     * Called when the component is created.
     */
    created() {
        // Check if the current user is already defined on initial page load.
        // If this is the case, force update the fields.
        this.onCurrentUserUpdate(this.currentUser);
    }

    /**
     * Set the fields value when the "currentUser" becomes available
     */
    @Watch("currentUser")
    onCurrentUserUpdate(val: Query<User>) {
        if (val.data) {
            this.fields.username.value = val.data.username;
            this.fields.email.value = val.data.email;
        }
    }

    /**
     * Update the profile settings that have changed on the page.
     */
    updateProfile() {
        updateUser(
            getFieldValues({
                username: this.fields.username,
                email: this.fields.email
            })
        )
            .then(_ => {
                // Send confirmation message.
                this.$store.dispatch("snackbar/open", {
                    message: "Successfully updated profile",
                    color: "success"
                });

                // Reload the profile page.
                reloadRoute(this.$router);
            })
            .catch(error => {
                this.$error(error, {
                    style: "SNACKBAR",
                    id: "profileUpdate"
                });
            });
    }
}
</script>
