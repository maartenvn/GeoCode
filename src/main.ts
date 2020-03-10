import Vue from "vue";
import App from "./App.vue";
import router from "./plugins/router";
import store from "./store/store";
import vuetify from "./plugins/vuetify";
import ErrorMixin from "./util/error/errormixin";

import "leaflet/dist/leaflet.css";

Vue.config.productionTip = false;

Vue.mixin(ErrorMixin);

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount("#app");
