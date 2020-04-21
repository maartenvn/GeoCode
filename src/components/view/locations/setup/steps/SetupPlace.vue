<template>
    <div>
        <v-stepper-step
            :complete="_stepper > stepperPosition"
            :step="stepperPosition"
        >
            Place the QR-code.
            <small>
                Place the QR-code at the entered location.
            </small>
        </v-stepper-step>

        <v-stepper-content :step="stepperPosition">
            <h3>Place the QR-code on the correct location.</h3>

            <p>
                Make sure to place the QR-code at the
                <strong>configured coordinates</strong>.
            </p>

            <p>
                It must be placed in a
                <strong>radius of 50 meters</strong> around the following
                coordinates:
            </p>

            <ul class="pb-5">
                <li><strong>Latitude:</strong> {{ latitude }}</li>
                <li><strong>Longitude:</strong> {{ longitude }}</li>
            </ul>

            <h3>Rules:</h3>

            <v-alert type="warning" text dense>
                <strong>Warning:</strong> Not obeying these rules will have your
                location removed & your account suspended.
            </v-alert>

            <ul>
                <li>
                    <strong>QR-code must be at the correct location.</strong>
                </li>

                <p class="text--secondary">
                    The QR-code must be placed within a radius of
                    <strong>50 meters</strong> around the given coordinates.
                </p>

                <li>
                    <strong>QR-code must be visible at any time</strong>
                </li>

                <p class="text--secondary">
                    The QR-code must be visible for visitors to find it. If you
                    want to leave a box with goodies for the visitors, make sure
                    to stick the QR code both inside & outside the box. It must
                    be visible without unfolding the paper.
                </p>

                <li><strong>QR-code must be accessible</strong></li>

                <p class="text--secondary">
                    The QR-code must be accessible for everyone
                    <strong>without huge obstacles</strong>. Not not put the
                    QR-code on a hard to access location such as a high tree-top
                    or a small cave. It must be scannable from the ground level.
                </p>

                <li><strong>QR-code must be protected</strong></li>

                <p class="text--secondary">
                    Make sure to protect the QR-code from rain or any other
                    natural activities. It is recommended to put it inside a
                    transparent <strong>plastic folder</strong>, with a tapped
                    down opening, to prevent moisture from getting on the paper.
                    <br />
                    You can also <strong>laminate</strong> the paper for even
                    better protection.
                </p>

                <li><strong>Respect the environment & property</strong></li>

                <p class="text--secondary">
                    Do not damage the environment or private/public property. Do
                    not harm trees or plants. Do not place the QR-code on
                    private property without
                    <strong>explicit permission</strong> of the property owner.
                </p>

                <p class="text--secondary">
                    You can help the environment by planting more trees. Check
                    out
                    <a href="https://teamtrees.org/" target="_blank">
                        TeamTrees
                    </a>
                </p>
            </ul>

            <v-checkbox
                class="ml-4"
                v-model="acceptRules"
                label="I have read the rules & accept the consequences of not following them."
            />

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
                    :disabled="!acceptRules"
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
export default class SetupPlace extends Vue {
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
     * Latitude of the location.
     */
    @Prop()
    latitude: number;

    /**
     * Longitude of the location.
     */
    @Prop()
    longitude: number;

    /**
     * If the user has accepted the rules.
     */
    acceptRules = false;
}
</script>
