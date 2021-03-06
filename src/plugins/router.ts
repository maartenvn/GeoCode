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
        path: "/locations/visit/:visitSecret",
        name: "Visit Location",
        component: () => import("../views/locations/Visit.vue"),
        props: true,
    },

    {
        path: "/achievements",
        name: "Achievements",
        component: () => import("../views/Achievements.vue"),
    },

    {
        path: "/leaderboards",
        name: "Leaderboards",
        component: () => import("../views/Leaderboards.vue"),
    },

    {
        path: "/tours",
        name: "Tours",
        component: () => import("../views/Tours.vue"),
    },

    {
        path: "/tours/:secretId",
        name: "Tour",
        component: () => import("../views/tours/Tour.vue"),
        props: true,
    },

    {
        path: "/privacypolicy",
        name: "Privacy Policy",
        component: () => import("../views/PrivacyPolicy.vue"),
    },

    {
        path: "/licenses",
        name: "Licenses.vue",
        component: () => import("../views/Licenses.vue"),
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
        path: "/profile/achievements/",
        name: "Your achievements",
        component: () => import("../views/profile/ProfileAchievements.vue"),
    },

    {
        path: "/profile/locations/",
        name: "Your location",
        component: () => import("../views/profile/ProfileLocations.vue"),
    },

    {
        path: "/profile/tours/",
        name: "Your tours",
        component: () => import("../views/profile/ProfileTours.vue"),
    },

    {
        path: "/profile/visits/",
        name: "Your visits",
        component: () => import("../views/profile/ProfileVisits.vue"),
    },

    {
        path: "/admin/",
        name: "Admin Home Page",
        component: () => import("../views/admin/Home.vue"),
    },

    {
        path: "/admin/reports",
        name: "Admin Reports List",
        component: () => import("../views/admin/Reports.vue"),
    },

    {
        path: "/admin/reports/:secretId",
        name: "Admin Location Reports",
        component: () => import("../views/admin/Location.vue"),
        props: true,
    },

    {
        path: "/admin/users",
        name: "Admin User List",
        component: () => import("../views/admin/Users.vue"),
    },
];

const router = new VueRouter({
    mode: process.env.VUE_APP_ROUTER_MODE,
    base: process.env.BASE_URL,
    routes,
});

export default router;
