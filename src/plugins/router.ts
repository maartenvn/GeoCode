import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
    { path: "*", component: () => import("../views/404.vue") },

    {
        path: "/",
        name: "Home",
        component: Home
    },

    {
        path: "/locations",
        name: "Locations",
        component: () => import("../views/Locations.vue")
    },

    {
        path: "/location/:secretId",
        name: "Location",
        component: () => import("../views/Location.vue"),
        props: true
    },

    {
        path: "/login",
        name: "Login",
        component: () => import("../views/Login.vue")
    },

    {
        path: "/register",
        name: "Register",
        component: () => import("../views/Register.vue")
    }
];

const router = new VueRouter({
    mode: process.env.VUE_APP_ROUTER_MODE,
    base: process.env.BASE_URL,
    routes
});

export default router;
