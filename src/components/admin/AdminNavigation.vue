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
import { Component, Vue } from "vue-property-decorator";

@Component
export default class AdminNavigation extends Vue {
    drawer: boolean;
    links: Array<{ title: string; to: string; icon: string }>;

    constructor() {
        super();

        this.drawer = false;
        this.links = [
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
        ];
    }

    /**
     * Toggle the drawer visible/invisible.
     */
    toggleDrawer() {
        this.drawer = !this.drawer;
    }
}
</script>
