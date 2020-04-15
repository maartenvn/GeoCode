import Vue from "vue";
import { RawLocation, VueRouter } from "vue-router/types/router";

export class RouterUtil {
    /**
     * Reload the current route.
     * @param router Instance of the current Vue router
     */

    static reload(router: VueRouter) {
        const location = router.currentRoute.path;

        router.replace("/");

        Vue.nextTick(() => router.push(location));
    }
}
