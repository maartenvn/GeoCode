export default {
    FRONTEND: {
        URL: process.env.VUE_APP_FRONTEND_URL,
    },

    BACKEND: {
        URL: process.env.VUE_APP_BACKEND_URL,
    },

    LEAFLET: {
        TILE_SERVER: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    },
};
