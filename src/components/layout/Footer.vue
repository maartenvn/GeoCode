<template>
    <v-footer color="primary" padless absolute>
        <v-card
            flat
            tile
            dense
            class="primary white--text text-center"
            style="width: 100%;"
        >
            <v-card-text>
                <!-- Links -->
                <v-btn
                    v-for="(link, index) of links"
                    :key="index"
                    :to="link.to"
                    color="white"
                    text
                    rounded
                    class="mx-1"
                >
                    {{ link.title }}
                </v-btn>
            </v-card-text>

            <v-divider />

            <v-card-text class="white--text">
                {{ new Date().getFullYear() }} — <strong>GeoCode</strong>
            </v-card-text>
        </v-card>
    </v-footer>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { NavigationLink } from "@/types/NavigationLink";

@Component
export default class Footer extends Vue {
    /**
     * Links to display inside the footer bar
     */
    links: Array<NavigationLink> = [
        {
            title: "Privacy Policy",
            to: "/privacypolicy",
            icon: "mdi-newspaper-variant-outline",
        },

        {
            title: "Licenses",
            to: "/licenses",
            icon: "mdi-license",
        },
    ];
}
</script>
