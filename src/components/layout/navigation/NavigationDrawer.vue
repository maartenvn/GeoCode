<template>
    <v-navigation-drawer v-model="_drawer" temporary fixed>
        <v-list nav dense>
            <v-list-item
                v-for="(link, index) in links"
                :key="index"
                :to="link.to"
            >
                <!-- Icon -->
                <v-list-item-icon>
                    <v-icon>{{ link.icon }}</v-icon>
                </v-list-item-icon>

                <!-- Text -->
                <v-list-item-content>
                    <v-list-item-title>{{ link.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <template v-if="!currentUser.isLoading()">
                <!-- User: logged in -->
                <template v-if="currentUser.data">
                    <v-list-group prepend-icon="mdi-account" no-action>
                        <!-- Username -->
                        <template v-slot:activator>
                            <v-list-item-title>
                                {{ currentUser.data.username }}
                            </v-list-item-title>
                        </template>

                        <!-- Items -->
                        <v-list dense nav>
                            <template v-for="(userLink, index) in userLinks">
                                <v-list-item
                                    v-if="!userLink.admin || isAdmin"
                                    :key="index"
                                    :to="userLink.to"
                                    exact
                                >
                                    <!-- Icon -->
                                    <v-list-item-icon>
                                        <v-icon>{{ userLink.icon }}</v-icon>
                                    </v-list-item-icon>

                                    <!-- Text -->
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            {{ userLink.title }}
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </template>
                        </v-list>
                    </v-list-group>
                </template>

                <!-- User: not logged in -->
                <template v-else>
                    <!-- Login -->
                    <v-list-item to="/login">
                        <!-- Icon -->
                        <v-list-item-icon>
                            <v-icon>mdi-login</v-icon>
                        </v-list-item-icon>

                        <!-- Text -->
                        <v-list-item-content>
                            <v-list-item-title>
                                Login
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <!-- Register -->
                    <v-list-item to="/register">
                        <!-- Icon -->
                        <v-list-item-icon>
                            <v-icon>mdi-account-plus</v-icon>
                        </v-list-item-icon>

                        <!-- Text -->
                        <v-list-item-content>
                            <v-list-item-title>
                                Register
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </template>
            </template>
        </v-list>
    </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue } from "vue-property-decorator";
import { StoreGetter } from "@/store/decorators/StoreGetterDecorator";
import { NavigationLink } from "@/types/NavigationLink";
import { EchoPromise } from "echofetch";
import User from "@/api/models/User";

@Component
export default class NavigationDrawer extends Vue {
    /**
     * Should the drawer be open.
     */
    @PropSync("drawer")
    _drawer: boolean;

    /**
     * Links to display inside the navigation bar
     */
    @Prop()
    links: Array<NavigationLink>;

    /**
     * Links to display inside the user submenu.
     */
    @Prop()
    userLinks: Array<NavigationLink>;

    /**
     * Current logged in user.
     */
    @StoreGetter("session/currentUser")
    currentUser: EchoPromise<User>;

    /**
     * If the user is an admin.
     */
    @StoreGetter("session/isAdmin")
    isAdmin: boolean;
}
</script>
