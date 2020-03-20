import User from "@/api/models/User";
import Query from "@/api/struct/Query";
import FetchHandler from "@/api/FetchHandler";
import UserService from "@/api/services/UserService";

export const session = {
    namespaced: true,

    state: {
        currentUser: null
    },

    mutations: {
        /**
         * Set the logged in user.
         *
         * @param state
         * @param user User that is logged in.
         */
        SET_CURRENTUSER(state: any, currentUser: Query<User>) {
            state.currentUser = currentUser;
        }
    },

    actions: {
        /**
         * Open a new modal.
         *
         * @param context
         */
        fetch(context: any) {
            context.commit(
                "SET_CURRENTUSER",
                FetchHandler.fetchQuery(UserService.getCurrent(), {
                    style: "NONE",
                    id: "currentUser"
                })
            );
        }
    },

    getters: {
        /**
         * Get the current user.
         *
         * @param state
         */
        currentUser(state: any): Query<User> {
            return state.currentUser;
        },

        /**
         * Get if the client is authenticated (logged in).
         *
         * @param state
         */
        isAuthenticated(state: any): boolean {
            return state.currentUser.data;
        }
    }
};
