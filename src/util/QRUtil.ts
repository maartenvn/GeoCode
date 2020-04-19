import config from "@/config";

export class QRUtil {
    /**
     * Get the QR code URL for the given parameters.
     * @param secretId Secret Id of the location.
     * @param type Type of QR-code (pdf or image)
     * @param size Size of the QR-code (only when type === "IMAGE")
     */
    static getQR(secretId: string, type: "PDF" | "IMAGE", size = 600) {
        let url = `${config.BACKEND.URL}locations/${secretId}/qrcode`;

        // Add endpoint for pdf.
        if (type === "PDF") {
            url = url + "/pdf";
        }

        // Add the frontend url
        url = url + `?frontend=${config.FRONTEND.URL}locations/visit/`;

        // Add size
        url = url + `&size=${size}`;

        return url;
    }
}
