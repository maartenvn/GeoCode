<template>
    <div>
        <v-card-title>
            Download QR Codes

            <v-spacer />

            <v-btn icon @click="close">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-card-title>

        <v-card-text>
            <p>
                Download the QR-code for this location below.
            </p>

            <v-alert type="warning" dense text>
                Do not share this QR-code with anyone, as it will result in the
                removal of this location and the suspension of your account.
            </v-alert>

            <qr-code-downloads :secret-id="payload.secretId" />
        </v-card-text>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import QrCodeDownloads from "@/components/view/location/qrcode/QrCodeDownloads.vue";

@Component({
    components: { QrCodeDownloads },
})
export default class QrCodeModal extends Vue {
    /**
     * Payload, passed when opening the modal.
     */
    @Prop()
    payload: {
        secretId: string;
    };

    /**
     * Close the modal.
     */
    close() {
        this.$store.dispatch("modal/close");
    }
}
</script>
