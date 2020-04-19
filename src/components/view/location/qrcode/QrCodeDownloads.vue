<template>
    <div class="qrcode__buttons">
        <v-btn :href="pdfUrl" color="primary" depressed block target="_blank">
            QR-code PDF
        </v-btn>

        <v-btn :href="imageUrl" color="primary" depressed block target="_blank">
            QR-code Image
        </v-btn>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { QRUtil } from "@/util/QRUtil";

@Component
export default class QrCodeDownloads extends Vue {
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
.qrcode {
    &__buttons {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;

        > * {
            min-width: 30% !important;
            margin-bottom: 10px;
        }
    }
}
</style>
