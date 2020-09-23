import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

import moment from "moment";

// disables warning about development mode
Vue.config.productionTip = false;

Vue.use(Vuetify);

Vue.prototype.moment = moment;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
