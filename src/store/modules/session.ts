import { EchoPromise } from "echofetch";
import User from "@/api/models/User";
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
        SET_CURRENTUSER(state: any, currentUser: EchoPromise<User>) {
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
            context.commit("SET_CURRENTUSER", UserService.get());
        }
    },

    getters: {
        /**
         * Get the current user.
         *
         * @param state
         */
        currentUser(state: any): EchoPromise<User> {
            return state.currentUser;
        },

        /**
         * Get if the client is authenticated (logged in).
         *
         * @param state
         */
        isAuthenticated(state: any): boolean {
            return state.currentUser.isSuccess();
        }
    }
};
