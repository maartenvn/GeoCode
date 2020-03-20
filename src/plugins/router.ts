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
        component: () => import("../views/locations/Location.vue"),
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
    },

    {
        path: "/logout",
        name: "Logout",
        component: () => import("../views/Logout.vue")
    },

    {
        path: "/profile",
        name: "Profile",
        component: () => import("../views/profile/Profile.vue")
    },

    {
        path: "/profile/locations/",
<<<<<<< HEAD
        name: "Your location",
        component: () => import("../views/profile/ProfileLocations.vue")
=======
        name: "Your locations",
        component: () => import("../views/ProfileLocations.vue")
    },

    {
        path: "/admin/",
        name: "Admin Page",
        component: () => import("../views/admin/Home.vue")
>>>>>>> a89dd73... Add admin basic logic
    }
];

const router = new VueRouter({
    mode: process.env.VUE_APP_ROUTER_MODE,
    base: process.env.BASE_URL,
    routes
});

export default router;
