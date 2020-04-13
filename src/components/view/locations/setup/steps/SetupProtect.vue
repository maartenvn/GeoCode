<template>
    <div>
        <v-stepper-step
            :complete="_stepper > stepperPosition"
            :step="stepperPosition"
        >
            Protect the QR-code.
            <small>
                Protect the QR-code using a plastic folder or by laminating.
            </small>
        </v-stepper-step>

        <v-stepper-content :step="stepperPosition">
            <h3>Protect the QR-code</h3>

            <p>
                It is very important to protect the QR-code from moisture or
                other environmental damage. When the QR-code is damaged, the
                location is no longer valid & will be removed. We recommend one
                of the following options:
            </p>

            <ul>
                <li><strong>Plastic cover</strong></li>

                <p>
                    Put the QR-code inside a plastic cover and tape down the
                    open parts to prevent moisture from getting in.
                </p>

                <p>
                    You can use multiple plastic covers to protect the QR-code
                    even further.
                </p>

                <li><strong>Laminate the paper</strong></li>

                <p>
                    Laminate the paper to protect moisture from damaging the
                    QR-code.
                </p>

                <li><strong>Plastic box</strong></li>

                <p>
                    Put the QR-code inside a plastic box.
                </p>

                <v-alert type="warning" dense text>
                    <strong>WARNING:</strong> make sure to also stick a copy of
                    the QR-code on the top of the box, to let visitors know they
                    found the location. Not sticking a copy on top is
                    <strong>against the rules</strong>
                </v-alert>
            </ul>

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
export default class SetupProtect extends Vue {
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
