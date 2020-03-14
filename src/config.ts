export default {
    BACKEND: {
        URL: process.env.VUE_APP_BACKEND_URL,

        ENDPOINTS: {
            LOCATIONS: "locations",
            USERS: "users",
            SESSION: "user",
            AUTH: {
                REGISTER: "auth/register"
            }
        }
    },

    LEAFLET: {
        TILE_SERVER: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    }
};
