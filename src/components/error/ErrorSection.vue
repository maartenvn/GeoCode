<template>
    <div
        :class="
            `error-section ${
                payload.options.displayFullpage ? 'text-center' : ''
            }`
        "
    >
        <!-- Image (only if fullscreen) -->
        <div
            v-if="payload.options.displayFullpage"
            class="error-section__image"
        >
            <v-img height="100%" src="@/assets/img/error.svg" contain />
        </div>

        <!-- Message -->
        <div class="error-section__message">
            {{ payload.value.message }}
        </div>

        <!-- Description -->
        <div class="error-section__description">
            {{ payload.value.description }}
        </div>

        <!-- Home button (only if fullscreen) -->
        <div class="error-section__actions">
            <v-btn color="primary" depressed to="/">
                Home Page
                <v-icon right>mdi-home</v-icon>
            </v-btn>

            <v-btn depressed @click="reloadRoute($router)">
                Refresh
                <v-icon right>mdi-refresh</v-icon>
            </v-btn>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { ErrorValue, ErrorOptions } from "../../util/error/errormixin";
import { ErrorPayload } from "../../util/error/errorhandler";
import { reloadRoute } from "@/util/routerutil";

@Component({
    methods: {
        reloadRoute
    }
})
export default class ErrorCard extends Vue {
    /**
     * Payload of the error.
     */
    @Prop()
    payload: ErrorPayload;
}
</script>

<style lang="scss" scoped>
.error-section {
    &__image {
        height: 150px;
        width: 100%;
        margin-bottom: 50px;
    }

    &__actions {
        margin-top: 50px;
        display: flex;
        justify-content: center;

        > * {
            margin: 0px 8px;
        }
    }

    &__message {
        font-size: 1.9em;
        font-weight: 500;
        padding-bottom: 20px;
    }

    &__description {
        font-size: 1.1em;
    }
}
</style>
