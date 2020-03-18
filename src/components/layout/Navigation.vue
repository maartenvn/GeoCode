<template>
    <div>
        <!-- Toolbar (TOP) -->
        <v-toolbar
            color="primary"
            elevate-on-scroll
            :flat="$route.name === 'Home'"
            dark
            fixed
        >
            <!-- Open drawer icon -->
            <v-app-bar-nav-icon
                class="hidden-md-and-up"
                @click.stop="toggleDrawer"
            />

            <!-- Title -->
            <v-toolbar-title class="navbar__title" @click="$router.push('/')">
                GeoCode
            </v-toolbar-title>

            <v-spacer />

            <!-- Items -->
            <v-toolbar-items class="hidden-sm-and-down">
                <v-btn
                    v-for="(link, index) in links"
                    :key="index"
                    :to="link.to"
                    text
                >
                    {{ link.title }}
                </v-btn>

                <!-- User: loading -->
                <template v-if="currentUser.loading">
                    <v-btn text>
                        <v-skeleton-loader
                            class="skeleton__user"
                            width="100px"
                            type="text"
                        />
                    </v-btn>
                </template>

                <!-- User: logged in -->
                <template v-else-if="currentUser.data">
                    <v-menu transition="slide-y-transition" offset-y bottom>
                        <template v-slot:activator="{ attrs, on }">
                            <v-btn v-on="on" v-bind="attrs" text>
                                {{ currentUser.data.username }}
                                <v-icon right>mdi-menu-down</v-icon>
                            </v-btn>
                        </template>
                        <v-list dense nav>
                            <v-list>
                                <!-- Profile -->
                                <v-list-item to="/profile" exact>
                                    <v-list-item-icon>
                                        <v-icon>mdi-account-box</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-title>
                                        My profile
                                    </v-list-item-title>
                                </v-list-item>

                                <!-- Profile locations -->
                                <v-list-item to="/profile/locations" exact>
                                    <v-list-item-icon>
                                        <v-icon>mdi-database-marker</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-title>
                                        My locations
                                    </v-list-item-title>
                                </v-list-item>

                                <!-- Logout -->
                                <v-list-item @click="logout" exact>
                                    <v-list-item-icon>
                                        <v-icon>mdi-logout</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-title>
                                        Logout
                                    </v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-list>
                    </v-menu>
                </template>

                <!-- User: not logged in -->
                <template v-else>
                    <v-btn to="/login" text>
                        <v-icon left>mdi-login</v-icon>
                        Login
                    </v-btn>

                    <v-btn to="/register" text>
                        <v-icon left>mdi-account-plus</v-icon>
                        Register
                    </v-btn>
                </template>
            </v-toolbar-items>
        </v-toolbar>

        <!-- Drawer (SMALL SCREENS) -->
        <v-navigation-drawer v-model="drawer" temporary fixed>
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

                <template v-if="!currentUser.loading">
                    <!-- User: logged in -->
                    <template v-if="currentUser.data">
                        <v-list-group prepend-icon="mdi-account" no-action>
                            <template v-slot:activator>
                                <v-list-item-title>
                                    {{ currentUser.data.username }}
                                </v-list-item-title>
                            </template>

                            <!-- Profile -->
                            <v-list-item to="/profile" exact>
                                <v-list-item-title>
                                    My profile
                                </v-list-item-title>
                                <v-list-item-icon>
                                    <v-icon>mdi-account-box</v-icon>
                                </v-list-item-icon>
                            </v-list-item>

                            <!-- Profile locations -->
                            <v-list-item to="/profile/locations" exact>
                                <v-list-item-title>
                                    My locations
                                </v-list-item-title>
                                <v-list-item-icon>
                                    <v-icon>mdi-database-marker</v-icon>
                                </v-list-item-icon>
                            </v-list-item>

                            <!-- Logout -->
                            <v-list-item @click="logout" exact>
                                <v-list-item-title>
                                    Logout
                                </v-list-item-title>
                                <v-list-item-icon>
                                    <v-icon>mdi-logout</v-icon>
                                </v-list-item-icon>
                            </v-list-item>
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
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { fetchQuery } from "@/util/fetchutil";
import { getCurrentUser, logoutUser } from "@/data/user";
import { StoreGetter } from "@/store/decorator";
import Query from "@/data/struct/Query";
import User from "@/data/models/User";
import RegisterModal from "./modals/RegisterModal.vue";

@Component
export default class Navigation extends Vue {
    drawer: boolean;
    links: Array<{ title: string; to: string; icon: string }>;

    @StoreGetter("session/currentUser")
    currentUser: Query<User>;

    constructor() {
        super();

        this.drawer = false;
        this.links = [
            {
                title: "Home",
                to: "/",
                icon: "mdi-home"
            },

            {
                title: "Locations",
                to: "/locations",
                icon: "mdi-map-marker"
            }
        ];
    }

    /**
     * Toggle the drawer visible/invisible.
     */
    toggleDrawer(): void {
        this.drawer = !this.drawer;
    }

    /**
     * Logout
     */
    logout(): void {
        logoutUser();
    }
}
</script>

<style lang="scss">
.navbar {
    &__title {
        cursor: pointer;
    }
}

.skeleton {
    &__user {
        > div {
            margin: 0px !important;
        }
    }
}
</style>