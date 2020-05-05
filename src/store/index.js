import Vue from "vue";
import Vuex from "vuex";
import { ClickMode } from "./constants.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    clickMode: ClickMode.NORMAL,
    atoms: [], // array of {type, x, y} where type = carbon/hydrogen
    bonds: [], // array of {atom1, atom2}
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
    addBond(state, bond) {
      state.bonds.push(bond);
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
        case ClickMode.ADD_BOND: {
          // Find which atom is clicked
          let clickedAtom = null;
          for (const atom of context.state.atoms) {
            const radius = 30;
            const dx = atom.x - x;
            const dy = atom.y - y;
            if (dx * dx + dy * dy <= radius * radius) {
              clickedAtom = atom;
              break;
            }
          }
          if (!clickedAtom) {
            break;
          }

          let startAtom = context.state.bondStartAtom;
          if (startAtom) {
            // Add bond and reset
            if (clickedAtom != startAtom) {
              context.commit("addBond", {
                atom1: context.state.bondStartAtom,
                atom2: clickedAtom,
              });
              context.commit("setBondStartAtom", null);
              context.commit("setClickMode", ClickMode.NORMAL);
            }
          } else {
            // Save as starting atom of bond
            context.commit("setBondStartAtom", clickedAtom);
          }
          break;
        }
        default:
          break;
      }
    },
  },
});
