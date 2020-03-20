<template>
    <v-app>
        <v-content>
            <!-- Admin Panel Navigation -->
            <admin-navigation v-if="$route.fullPath.startsWith('/admin/')" />

            <!-- Navigation -->
            <navigation v-else />

            <!-- Content -->
            <router-view-wrapper />

            <!-- Snackbar -->
            <snackbar />

            <!-- Modal -->
            <modal />
        </v-content>
    </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { CustomErrorOptions } from "@/api/error/types/CustomErrorOptions";
import { EchoError } from "echofetch";
import Navigation from "@/components/layout/Navigation.vue";
import RouterViewWrapper from "@/components/util/RouterViewWrapper.vue";
import Snackbar from "@/components/layout/Snackbar.vue";
import Modal from "@/components/layout/Modal.vue";
<<<<<<< HEAD
import ErrorBus from "@/api/error/ErrorBus";
=======
import AdminNavigation from "@/components/admin/AdminNavigation.vue";
>>>>>>> a89dd73... Add admin basic logic

@Component({
    components: {
        Navigation,
        AdminNavigation,
        RouterViewWrapper,
        Snackbar,
        Modal
    }
})
export default class App extends Vue {
    created() {
        // Fetch the session data.
        this.$store.dispatch("session/fetch");

        // Listen for any potential "SNACKBAR" errors to display.
        ErrorBus.$on(
            "error",
            (error: EchoError, options: CustomErrorOptions) => {
                if (options.style === "SNACKBAR") {
                    this.$store.dispatch("snackbar/open", {
                        message: error.message,
                        color: "error"
                    });
                }
            }
        );
    }
}
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

    &__description {
        color: rgba(0, 0, 0, 0.6);
        padding-top: 5px;
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
    margin-top: 20px;

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

.input__title {
    color: rgba(0, 0, 0, 0.6);
    font-size: 16px;
    line-height: 1;
    min-height: 8px;
    margin-top: 20px;
}

.grecaptcha-badge {
    display: none !important;
}
</style>
