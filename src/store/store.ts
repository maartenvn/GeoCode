import Vue from "vue";
import Vuex from "vuex";
import { snackbar } from "./modules/snackbar";
import { modal } from "./modules/modal";
import { session } from "./modules/session";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        snackbar,
        modal,
        session,
    },
});
