export default {
    BACKEND: {
        URL: process.env.VUE_APP_BACKEND_URL,

        ENDPOINTS: {
            LOCATIONS: "locations",
            USERS: "users",
            SESSION: "user",
            OAUTH: {
                GOOGLE: "oauth/google"
            }
        }
    },

    LEAFLET: {
        TILE_SERVER: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    }
};
