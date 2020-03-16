import { fetchQuery } from "@/util/fetchutil";
import { getCurrentUser } from "@/data/user";
import User from "@/data/models/User";
import Query from "@/data/struct/Query";

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
                fetchQuery(getCurrentUser(), {
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
