<template>
    <div>
        <!-- Toolbar (TOP) -->
        <navigation-bar
            :drawer.sync="drawer"
            :links="links"
            :user-links="userLinks"
        />

        <!-- Drawer (SMALL SCREENS) -->
        <navigation-drawer
            :drawer.sync="drawer"
            :links="links"
            :user-links="userLinks"
        />
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { StoreGetter } from "@/store/decorators/StoreGetterDecorator";
import { EchoPromise } from "echofetch";
import { NavigationLink } from "@/types/NavigationLink";
import User from "@/api/models/User";
import NavigationBar from "@/components/layout/navigation/NavigationBar.vue";
import NavigationDrawer from "@/components/layout/navigation/NavigationDrawer.vue";

@Component({
    components: { NavigationDrawer, NavigationBar }
})
export default class Navigation extends Vue {
    /**
     * Should the drawer be open.
     */
    drawer = false;

    /**
     * Links to display inside the navigation bar
     */
    links: Array<NavigationLink> = [
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

    /**
     * Links to display inside the user submenu.
     */
    userLinks: Array<NavigationLink> = [
        {
            title: "My profile",
            to: "/profile",
            icon: "mdi-account-box"
        },

        {
            title: "My Locations",
            to: "/profile/locations",
            icon: "mdi-database-marker"
        },

        {
            title: "My Visits",
            to: "/profile/visits",
            icon: "mdi-map-marker-check"
        },

        {
            title: "Logout",
            to: "/logout",
            icon: "mdi-logout"
        }
    ];

    @StoreGetter("session/currentUser")
    currentUser: EchoPromise<User>;
}
</script>

<style lang="scss">
.skeleton {
    &__user {
        > div {
            margin: 0px !important;
        }
    }
}
</style>
