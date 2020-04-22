<template>
    <v-container class="container--small">
        <v-row align="center" justify="center">
            <v-col cols="12" md="6">
                <!-- Loading -->
                <v-card v-if="location.isLoading()">
                    <div class="visit__loading">
                        <v-progress-circular
                            :size="100"
                            color="primary"
                            indeterminate
                        />
                    </div>
                </v-card>

                <v-card v-else-if="location.isSuccess()">
                    <!-- Message saying you found the location -->
                    <div class="visit__image">
                        <v-img src="@/assets/img/treasure.svg" width="40%" />
                    </div>

                    <v-card-title>
                        Congratulations you found:
                        {{ location.data.name }}
                    </v-card-title>

                    <v-card-text>
                        Congratulations, you found a QR-code of a hidden
                        location! You can now unlock its hidden features!
                    </v-card-text>

                    <template v-if="currentUser.isError()">
                        <!-- Auth -->
                        <visit-auth />
                    </template>

                    <template v-else-if="currentUser.isSuccess()">
                        <!-- Confirm visit -->
                        <visit-confirm
                            :visit-secret="visitSecret"
                            :location="location.requireData()"
                        />
                    </template>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { StoreGetter } from "@/store/decorators/StoreGetterDecorator";
import { EchoPromise } from "echofetch";
import User from "@/api/models/User";
import VisitAuth from "@/components/view/locations/visit/VisitAuth.vue";
import VisitConfirm from "@/components/view/locations/visit/VisitConfirm.vue";
import { RequestHandler } from "@/api/RequestHandler";
import LocationService from "@/api/services/LocationService";

@Component({
    components: { VisitConfirm, VisitAuth },
})
export default class VisitLocationView extends Vue {
    /**
     * Visit Secret of the location.
     * Should be passed by Vue Router.
     */
    @Prop()
    visitSecret: string;

    /**
     * Current logged in user.
     */
    @StoreGetter("session/currentUser")
    currentUser: EchoPromise<User>;

    /**
     * Location for the corresponding visit code.
     */
    location = RequestHandler.handle(
        LocationService.getLocationByVisitSecret(this.visitSecret),
        {
            id: "locationsVisit",
            style: "CARD",
            displayFullpage: true,
        }
    );
}
</script>

<style lang="scss">
.visit {
    &__loading {
        height: 350px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    &__image {
        width: 100%;
        padding: 25px 0px;

        > * {
            margin: auto;
        }
    }
}
</style>
