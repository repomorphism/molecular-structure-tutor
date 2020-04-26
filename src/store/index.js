import Vue from "vue";
import Vuex from "vuex";
import { ClickMode } from "./constants.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    clickMode: ClickMode.NORMAL,
    atoms: [],
  },
  mutations: {
    setClickMode(state, mode) {
      state.clickMode = mode;
    },
    addAtom(state, atom) {
      state.atoms.push(atom);
    },
  },
  actions: {
    setClickMode(context, mode) {
      context.commit("setClickMode", mode);
    },
    performCanvasAction(context, position) {
      const { x, y } = position;
      switch (context.state.clickMode) {
        case ClickMode.ADD_CARBON:
          context.commit("addAtom", { type: "carbon", x, y });
          break;
        case ClickMode.ADD_HYDROGEN:
          context.commit("addAtom", {
            type: "hydrogen",
            x,
            y,
          });
          break;
        default:
          break;
      }
      context.commit("setClickMode", ClickMode.NORMAL);
    },
  },
});
