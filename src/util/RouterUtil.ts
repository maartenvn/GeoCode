import Vue from "vue";
import { VueRouter } from "vue-router/types/router";

export class RouterUtil {
    /**
     * Reload the current route.
     * @param router Instance of the current Vue router
     */

    static reload(router: VueRouter) {
        const location = router.currentRoute;

        router.replace("/");

        Vue.nextTick(() => router.replace(location));
    }
}
