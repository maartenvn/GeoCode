<template>
    <div>
        <v-stepper-step
            :complete="_stepper > stepperPosition"
            :step="stepperPosition"
        >
            Introduction
            <small>
                You will have to do a few more steps to activate your location.
            </small>
        </v-stepper-step>

        <v-stepper-content :step="stepperPosition">
            <p>
                You have successfully made your location, but it has not yet
                been activated. In order to activate it you must follow a few
                more steps.
            </p>

            <h3>How to people visit my location?</h3>

            <ol>
                <li>
                    You will receive a <strong>QR-code</strong> in the next
                    step. You must place this QR-code on the location you have
                    selected.
                </li>

                <li>
                    Visitors can then search for the location & scan the QR-code
                    once they found it.
                </li>

                <li>
                    After scanning the QR-code, visitors be able to leave a
                    message to the guestbook.
                </li>

                <li>
                    The more scans, the higher the location will be displayed in
                    the <em>recommended locations list</em>.
                </li>
            </ol>

            <p class="pt-4">
                Click the <strong>continue</strong> button to get your QR-code.
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

                <v-btn
                    color="primary"
                    depressed
                    @click="_stepper = stepperPosition + 1"
                >
                    Continue
                </v-btn>
            </v-card-actions>
        </v-stepper-content>
    </div>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue } from "vue-property-decorator";

@Component
export default class SetupIntro extends Vue {
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
}
</script>
