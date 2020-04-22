<template>
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
                exact
                text
            >
                {{ link.title }}
            </v-btn>

            <!-- User: loading -->
            <template v-if="currentUser.isLoading()">
                <v-btn text>
                    <v-skeleton-loader
                        class="skeleton__user"
                        width="100px"
                        type="text"
                    />
                </v-btn>
            </template>

            <!-- User: logged in -->
            <template v-else-if="currentUser.isSuccess()">
                <v-menu transition="slide-y-transition" offset-y bottom>
                    <!-- Username -->
                    <template v-slot:activator="{ attrs, on }">
                        <v-btn v-on="on" v-bind="attrs" text>
                            {{ currentUser.data.username }}
                            <v-icon right>mdi-menu-down</v-icon>
                        </v-btn>
                    </template>

                    <!-- Items -->
                    <v-list dense nav>
                        <v-list-item
                            v-for="(userLink, index) in userLinks"
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
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue } from "vue-property-decorator";
import { StoreGetter } from "@/store/decorators/StoreGetterDecorator";
import { NavigationLink } from "@/types/NavigationLink";
import { EchoPromise } from "echofetch";
import User from "@/api/models/User";

@Component
export default class NavigationBar extends Vue {
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
     * Toggle the drawer visible/invisible.
     */
    toggleDrawer(): void {
        this._drawer = !this._drawer;
    }
}
</script>

<style lang="scss">
.navbar {
    &__title {
        cursor: pointer;
    }
}
</style>
