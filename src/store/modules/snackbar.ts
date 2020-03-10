export class SnackbarData {
    /**
     * Message to display.
     */
    public message: string;

    /**
     * Location on the X-axis.
     */
    public x: "right" | "left" | "center";

    /**
     * Location on the Y-axis.
     */
    public y: string;

    /**
     * Color of the snackbar.
     */
    public color: string;

    /**
     * Timeout delay before disappearing
     */
    public timeout: number;

    constructor() {
        this.message = "";
        this.x = "right";
        this.y = "bottom";
        this.color = "info";
        this.timeout = 6000;
    }
}

export const snackbar = {
    namespaced: true,

    state: {
        open: false,
        data: {}
    },

    mutations: {
        /**
         * Open/close the snackbar.
         *
         * @param state
         * @param open
         */
        SET_OPEN(state: unknown, open: boolean) {
            state.open = open;
        },

        /**
         * Set the snackbar data.
         *
         * @param state
         * @param data
         */
        SET_DATA(state: unknown, data: SnackbarData) {
            // Join a new snackbar with the given data.
            // This is so you only have to provide the changes.
            state.data = {
                ...new SnackbarData(),
                ...data
            };
        }
    },

    actions: {
        /**
         * Open a new snackbar.
         *
         * @param context
         * @param data
         */
        open(context: unknown, data: SnackbarData) {
            context.commit("SET_OPEN", false);
            context.commit("SET_DATA", data);
            context.commit("SET_OPEN", true);
        },

        /**
         * Close the opened snackbar.
         *
         * @param context
         */
        close(context: unknown) {
            context.commit("SET_OPEN", false);
        }
    }
};
