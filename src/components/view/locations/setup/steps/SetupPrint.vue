<template>
    <div>
        <v-stepper-step
            :complete="_stepper > stepperPosition"
            :step="stepperPosition"
        >
            Print the QR-code.
            <small>
                Other people have to scan this code to visit the location.
            </small>
        </v-stepper-step>

        <v-stepper-content :step="stepperPosition">
            <h3>Print the QR-code</h3>

            <p>
                Download & print the following QR-code. There are multiple sizes
                available depending on where you want to hide it.
            </p>

            <div class="setup__print__buttons">
                <v-btn color="primary" depressed block>A4</v-btn>
                <v-btn color="primary" depressed block>A5</v-btn>
                <v-btn color="primary" depressed block>QR-code only</v-btn>
            </div>

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
export default class SetupPrint extends Vue {
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

<style lang="scss">
.setup {
    &__print {
        &__buttons {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-bottom: 20px;

            > * {
                min-width: 20% !important;
                margin-bottom: 10px;
            }
        }
    }
}
</style>
