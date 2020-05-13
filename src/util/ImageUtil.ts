import config from "@/config";

export class ImageUtil {
    /**
     * Get an image by id.
     * @param id Id of the image
     */
    static getById(id: number): string {
        if (id) {
            return `${config.BACKEND.URL}images/${id}`;
        }

        return "";
    }
}
