<template>
    <div>
        <v-stepper-step
            :complete="_stepper > stepperPosition"
            :step="stepperPosition"
        >
            Activate the location.
            <small>
                Activate the location so it will be visible to other users.
            </small>
        </v-stepper-step>

        <v-stepper-content :step="stepperPosition">
            <h3>You are almost done!</h3>

            <p>
                Make sure the QR-code is placed on the correct location &
                secured to prevent it from getting removed by wind or animals.
            </p>

            <p>
                Once placed you can click the
                <em>"activate location"</em> button to activate your location.
            </p>

            <v-alert dense text type="warning">
                <strong>WARNING:</strong> Do not activate the location UNTIL you
                have placed the QR-code. If the QR-code is not present at the
                correct location, it will be removed &
                <strong>your account will be suspended.</strong>
            </v-alert>

            <h3>Thank you for contributing!</h3>

            <p>
                Thank you very much for contributing! Without you GeoCode would
                not be possible. You are truly the best
                <i class="mdi mdi-heart"></i>
            </p>

            <v-card-actions>
                <v-btn
                    v-if="_stepper > 1"
                    text
                    @click="_stepper = stepperPosition - 1"
                >
                    Go back
                </v-btn>

                <v-spacer />

                <v-btn color="primary" depressed @click="openConfirmActivate">
                    Activate location
                </v-btn>
            </v-card-actions>
        </v-stepper-content>
    </div>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue } from "vue-property-decorator";
import ConfirmModal from "@/components/modal/ConfirmModal.vue";
import LocationService from "@/api/services/LocationService";
import { ErrorHandler } from "@/api/error/ErrorHandler";
import { RouterUtil } from "@/util/RouterUtil";

@Component
export default class SetupActivate extends Vue {
    /**
     * Used for keeping the current position of the stepper.
     */
    @PropSync("stepper")
    _stepper: number;

    /**
     * Position of this entry inside the stepper.
     */
    @Prop()
    stepperPosition: number;

    /**
     * Secret ID of the location to activate.
     */
    @Prop()
    secretId: string;

    /**
     * Open a model to confirm the activation of a location.
     */
    openConfirmActivate() {
        this.$store.dispatch("modal/open", {
            component: ConfirmModal,
            componentPayload: {
                message: `Are you sure you want to activate this location?
                     You <strong>must place the QR-code at the correct location</strong> before activating it.

                     <div class="warning--text mt-4 pa-4" style="background-color: rgba(251, 140, 0, 0.12)">
                        <strong>WARNING:</strong> Do not activate the location UNTIL you
                        have placed the QR-code. If the QR-code is not present at the
                        correct location, it will be removed &
                        <strong>your account will be suspended.</strong>
                     </div>
                    `,
                action: () => {
                    LocationService.update(this.secretId, { active: true })
                        .then((_) => {
                            // Close the modal.
                            this.$store.dispatch("modal/close");

                            // Send confirmation message.
                            this.$store.dispatch("snackbar/open", {
                                message: "Location has been activated",
                                color: "success",
                            });

                            // Reload the page.
                            RouterUtil.reload(this.$router);
                        })
                        .catch((error) => {
                            ErrorHandler.handle(error, {
                                id: "locationActivate",
                                style: "SNACKBAR",
                                customMessages: [
                                    {
                                        code: "400",
                                        message:
                                            "Unable to active location. Try again later!",
                                        description: "Something went wrong!",
                                    },
                                ],
                            });
                        });
                },
            },
        });
    }
}
</script>
