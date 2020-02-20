<template>
    <v-app>
        <v-content>
            <!-- Navigation -->
            <Navigation />

            <!-- Content -->
            <router-view />
        </v-content>
    </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Navigation from "@/components/layout/Navigation";

export default Vue.extend({
    name: "App",
    components: {
        Navigation
    }
});
</script>
