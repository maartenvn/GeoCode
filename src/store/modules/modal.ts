export class ModalData {
    /**
     * Component to display inside the modal.
     */
    public component: string;

    /**
     * Width of the modal
     */
    public width?: number;

    /**
     * Should the modal fill the entire screen.
     */
    public fullscreen: boolean;

    constructor() {
        this.component = "";
        this.width = 600;
        this.fullscreen = false;
    }
}

export const modal = {
    namespaced: true,

    state: {
        open: false,
        data: {}
    },

    mutations: {
        /**
         * Open/close the modal.
         *
         * @param state
         * @param open
         */
        SET_OPEN(state: unknown, open: boolean) {
            state.open = open;
        },

        /**
         * Set the snackbar modal.
         *
         * @param state
         * @param data
         */
        SET_DATA(state: unknown, data: ModalData) {
            // Join a new modal with the given data.
            // This is so you only have to provide the changes.
            state.data = {
                ...new ModalData(),
                ...data
            };
        }
    },

    actions: {
        /**
         * Open a new modal.
         *
         * @param context
         * @param data
         */
        open(context: unknown, data: ModalData) {
            context.commit("SET_OPEN", false);
            context.commit("SET_DATA", data);
            context.commit("SET_OPEN", true);
        },

        /**
         * Close the opened modal.
         *
         * @param context
         */
        close(context: unknown) {
            context.commit("SET_OPEN", false);
        }
    }
};
