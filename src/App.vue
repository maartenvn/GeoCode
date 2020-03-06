<template>
    <v-app>
        <v-content>
            <!-- Navigation -->
            <Navigation />

            <!-- Content -->
            <router-view-wrapper />

            <!-- Snackbar -->
            <snackbar />
        </v-content>
    </v-app>
</template>

<script lang="ts">
import Navigation from "@/components/layout/Navigation.vue";
import RouterViewWrapper from "@/components/util/RouterViewWrapper.vue";
import Snackbar from "@/components/layout/Snackbar.vue";

export default {
    name: "App",
    components: {
        Navigation,
        RouterViewWrapper,
        Snackbar
    }
};
</script>

<style lang="scss">
.section {
    margin-bottom: 30px;

    &__title {
        /* font-size: 2em; */
        font-size: 1.25rem;
        font-weight: 500;
        line-height: 2rem;
        display: flex;
    }

    &__content {
        padding-top: 16px;
        padding-bottom: 16px;
    }
}

.divider {
    &--vertical {
        margin: 15px;
    }
}

.container {
    &--small {
        max-width: 1250px;
    }
}

.li {
    &__title {
        font-weight: bold;
        display: block;
    }

    &__content {
        display: block;
        margin-bottom: 15px;
    }
}
</style>
