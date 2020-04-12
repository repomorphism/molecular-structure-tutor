import Vue from "vue";
// @ts-ignore
import App from "./App.vue";
import store from "./store";

Vue.config.productionTip = false;

// @ts-ignore
new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
