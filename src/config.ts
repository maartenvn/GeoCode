export default {
    BACKEND: {
        URL: process.env.VUE_APP_BACKEND_URL,

        ENDPOINTS: {
            LOCATIONS: "locations",
            USERS: "users",
            SESSION: {
                USER: "user",
                LOCATIONS: "user/locations"
            },
            AUTH: {
                REGISTER: "auth/register",
                LOGIN: "auth/login"
            }
        }
    },

    LEAFLET: {
        TILE_SERVER: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    }
};
