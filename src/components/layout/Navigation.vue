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
            <v-toolbar-title>GeoCode</v-toolbar-title>

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
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Navigation extends Vue {
    drawer: boolean;
    links: Array<{ title: string; to: string; icon: string }>;

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
}
</script>
