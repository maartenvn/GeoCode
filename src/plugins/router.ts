import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    { path: "*", component: () => import("../views/404.vue") },

    {
        path: "/",
        name: "Home",
        component: () => import("../views/Home.vue"),
    },

    {
        path: "/locations",
        name: "Locations",
        component: () => import("../views/Locations.vue"),
    },

    {
        path: "/locations/:secretId",
        name: "Location",
        component: () => import("../views/locations/Location.vue"),
        props: true,
    },

    {
        path: "/locations/visit/:visitCode",
        name: "Visit Location",
        component: () => import("../views/locations/Visit.vue"),
        props: true,
    },

    {
        path: "/login",
        name: "Login",
        component: () => import("../views/Login.vue"),
    },

    {
        path: "/register",
        name: "Register",
        component: () => import("../views/Register.vue"),
    },

    {
        path: "/logout",
        name: "Logout",
        component: () => import("../views/Logout.vue"),
    },

    {
        path: "/profile",
        name: "Profile",
        component: () => import("../views/profile/Profile.vue"),
    },

    {
        path: "/profile/locations/",
        name: "Your location",
        component: () => import("../views/profile/ProfileLocations.vue"),
    },

    {
        path: "/profile/visits/",
        name: "Your visits",
        component: () => import("../views/profile/ProfileVisits.vue"),
    },
];

const router = new VueRouter({
    mode: process.env.VUE_APP_ROUTER_MODE,
    base: process.env.BASE_URL,
    routes,
});

export default router;
