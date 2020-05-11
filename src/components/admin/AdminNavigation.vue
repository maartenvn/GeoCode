<template>
    <div>
        <!-- Toolbar (TOP) -->
        <v-app-bar color="primary" app dark fixed clipped-left>
            <!-- Open drawer icon -->
            <v-app-bar-nav-icon
                class="hidden-md-and-up"
                @click.stop="toggleDrawer"
            />

            <!-- Title -->
            <v-toolbar-title @click="$router.push('/admin')">
                Admin Panel
            </v-toolbar-title>

            <v-spacer />
        </v-app-bar>

        <!-- Drawer (SIDE) -->
        <v-navigation-drawer
            v-model="drawer"
            app
            clipped
            :expand-on-hover="$vuetify.breakpoint.mdAndUp"
            :permanent="$vuetify.breakpoint.mdAndUp"
            fixed
        >
            <v-list nav dense>
                <v-list-item
                    v-for="(link, index) of links"
                    :key="index"
                    :to="link.to"
                    exact
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
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { StoreGetter } from "@/store/decorators/StoreGetterDecorator";
import { EchoPromise } from "echofetch";
import User from "@/api/models/User";

@Component
export default class AdminNavigation extends Vue {
    /**
     * If the drawer is open or not.
     */
    drawer = false;

    /**
     * Links for the sidebar.
     */
    links = [
        {
            title: "Home",
            to: "/admin",
            icon: "mdi-home",
        },
        {
            title: "Reports",
            to: "/admin/reports",
            icon: "mdi-alert-octagon",
        },
        {
            title: "Users",
            to: "/admin/users",
            icon: "mdi-account",
        },
    ];

    /**
     * Current logged in user.
     */
    @StoreGetter("session/currentUser")
    currentUser: EchoPromise<User>;

    /**
     * If the user is logged in.
     */
    @StoreGetter("session/isAuthenticated")
    isAuthenticated: boolean;

    /**
     * If the user is an admin.
     */
    @StoreGetter("session/isAdmin")
    isAdmin: boolean;

    /**
     * Navigate to the homepage when the user has no permission to see the admin panel.
     */
    @Watch("currentUser", { immediate: true })
    checkAdmin() {
        if (this.currentUser.isSuccess() || this.currentUser.isError()) {
            // Check if the user is logged in.
            if (!this.isAuthenticated) {
                this.$router.push("/");

                this.$store.dispatch("snackbar/open", {
                    message: "You are not logged in!",
                    color: "error",
                });
            }

            // Check if the user is an admin.
            if (!this.isAdmin) {
                this.$router.push("/");

                this.$store.dispatch("snackbar/open", {
                    message: "You are not an admin!",
                    color: "error",
                });
            }
        }
    }

    /**
     * Toggle the drawer visible/invisible.
     */
    toggleDrawer() {
        this.drawer = !this.drawer;
    }
}
</script>
