export default {
    BACKEND: {
        URL: process.env.VUE_APP_BACKEND_URL,

        ENDPOINTS: {
            LOCATIONS: "locations",
            USERS: "users",
            AUTH: {
                REGISTER: "auth/register",
                LOGIN: "auth/login",
                SESSION: "auth/session"
            }
        }
    },

    LEAFLET: {
        TILE_SERVER: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    }
};
