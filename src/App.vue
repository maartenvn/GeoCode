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
import Navigation from "@/components/layout/Navigation.vue";

export default {
    name: "App",
    components: {
        Navigation
    }
};
</script>

<style lang="scss">
.section {
    &__title {
        font-size: 2em;
    }
}

.divider {
    &--vertical {
        margin: 15px;
    }
}
</style>
