import Vue from "vue";
import Vuex from "vuex";
import { ClickMode } from "./constants.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    clickMode: ClickMode.NORMAL,
    atoms: [],
    bonds: [],
    bondStartAtom: null,
  },
  mutations: {
    setClickMode(state, mode) {
      state.clickMode = mode;
    },
    addAtom(state, atom) {
      state.atoms.push(atom);
    },
    setBondStartAtom(state, atom) {
      state.bondStartAtom = atom;
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
          context.commit("setClickMode", ClickMode.NORMAL);
          break;
        case ClickMode.ADD_HYDROGEN:
          context.commit("addAtom", {
            type: "hydrogen",
            x,
            y,
          });
          context.commit("setClickMode", ClickMode.NORMAL);
          break;
        case ClickMode.ADD_BOND:
          for (const atom of context.state.atoms) {
            const radius = 30;
            const dx = atom.x - x;
            const dy = atom.y - y;
            if (dx * dx + dy * dy <= radius * radius) {
              console.log(atom.x, atom.y);
              break;
            }
          }
          break;
        default:
          break;
      }
    },
  },
});
