import Vue from "vue";
import VueRouter from "vue-router";

/**
 * Reload the current route.
 * @param router Instance of the current Vue router
 */
export function reloadRoute(router: VueRouter) {
    const location = router.currentRoute;

    router.replace("/");

    Vue.nextTick(() => router.replace(location));
}
