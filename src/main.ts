import Vue from "vue";
import App from "./App.vue";
import router from "./plugins/router";
import store from "./store/store";
import vuetify from "./plugins/vuetify";

import "./plugins/leaflet";
import ErrorMixin from "./api/error/ErrorMixin";

Vue.config.productionTip = false;

Vue.mixin(ErrorMixin);

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount("#app");
