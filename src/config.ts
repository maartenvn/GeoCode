export default {
    BACKEND: {
        URL: process.env.VUE_APP_BACKEND_URL,

        ENDPOINTS: {
            LOCATIONS: "locations",
            USERS: "users",
            SESSION: {
                USER: "user",
                LOCATIONS: "user/location"
            },
            AUTH: {
                REGISTER: "auth/register",
                LOGIN: "auth/login",
                LOGOUT: "auth/logout"
            }
        }
    },

    LEAFLET: {
        TILE_SERVER: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    }
};
