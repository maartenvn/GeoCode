import Vue from "vue";
import Vuetify from "vuetify/lib";

import "@mdi/font/css/materialdesignicons.css";
import "typeface-roboto/index.css";

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: "mdi"
    },
    theme: {
        options: {
            customProperties: true
        },
        themes: {
            light: {
                primary: "#4CAF50",
                secondary: "#FF9800"
            }
        }
    }
});
