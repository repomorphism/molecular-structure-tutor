import Vue from "vue";
import Vuex from "vuex";
import { ClickMode } from "./constants.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    clickMode: ClickMode.NORMAL,
  },
  mutations: {
    setClickMode(state, mode) {
      state.clickMode = mode;
    },
  },
  actions: {
    setClickMode(context, mode) {
      context.commit("setClickMode", mode);
    },
  },
});
