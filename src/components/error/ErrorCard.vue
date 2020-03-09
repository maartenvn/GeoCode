<template>
    <v-card
        :class="
            `error-card ${payload.options.displayFullpage ? 'text-center' : ''}`
        "
    >
        <!-- Image (only if fullscreen) -->
        <div v-if="payload.options.displayFullpage" class="error-card__image">
            <v-img height="100%" src="@/assets/img/error.svg" contain />
        </div>

        <!-- Message -->
        <v-card-title class="error-card__message">
            {{ payload.value.message }}
        </v-card-title>

        <!-- Description -->
        <v-card-text class="error-card__description">
            {{ payload.value.description }}
        </v-card-text>

        <!-- Home button (only if fullscreen) -->
        <v-card-actions class="error-card__actions">
            <v-btn color="primary" depressed to="/">
                Home Page
                <v-icon right>mdi-home</v-icon>
            </v-btn>

            <v-btn depressed @click="reloadRoute($router)">
                Refresh
                <v-icon right>mdi-refresh</v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
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
.error-card {
    &__image {
        height: 150px;
        width: 100%;
        margin-bottom: 50px;
    }

    &__actions {
        display: flex;
        justify-content: center;
        margin-top: 50px;
    }

    &__message {
        font-size: 1.9em;
        padding-bottom: 20px;
    }

    &__description {
        font-size: 1.1em;
    }
}
</style>
