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
                <v-btn
                    :href="pdfUrl"
                    color="primary"
                    depressed
                    block
                    target="_blank"
                >
                    QR-code PDF
                </v-btn>

                <v-btn
                    :href="imageUrl"
                    color="primary"
                    depressed
                    block
                    target="_blank"
                >
                    QR-code Image
                </v-btn>
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
import { QRUtil } from "@/util/QRUtil";

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

    /**
     * Secret ID of the location to activate.
     */
    @Prop()
    secretId: string;

    /**
     * Get the URL of the PDF Qr-Code
     */
    get pdfUrl(): string {
        return QRUtil.getQR(this.secretId, "PDF");
    }

    /**
     * Get the URL of the Image Qr-Code
     */
    get imageUrl(): string {
        return QRUtil.getQR(this.secretId, "IMAGE");
    }
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
