import Vue from "vue";
// @ts-ignore
import App from "./App.vue";
import Vuex from "vuex";

Vue.config.productionTip = false;

// @ts-ignore
Vue.use(Vuex);

// @ts-ignore
new Vue({
  render: h => h(App)
}).$mount("#app");
