import Vue from "vue";
import Vuex from "vuex";
import { ClickMode } from "./constants.js";
import { findClickedAtom } from "./helperFunctions.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    molecule: "C2H4",
    moleculeBonds: {
      '["C","C",2]': 1,
      '["H","C",1]': 4,
    }, //array of [[total_bond_count_in_molecule,{symbol1, symbol2, count}]]
    clickMode: ClickMode.NORMAL,
    atoms: [], // array of {symbol, type, x, y} where type = carbon/hydrogen
    bonds: {}, // object of { (string id from atom indices) : { atom1, atom2, count } }
    bondStartAtom: null,
    feedback: null,
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
    addBond(state, bondAtoms) {
      const bonds = { ...state.bonds };
      const atomIndices = bondAtoms.map((atom) => state.atoms.indexOf(atom));
      const bondID = atomIndices.sort().toString();
      if (bondID in bonds) {
        const originalCount = bonds[bondID].count;
        bonds[bondID].count = originalCount + 1;
      } else {
        bonds[bondID] = {
          atom1: bondAtoms[0],
          atom2: bondAtoms[1],
          count: 1,
        };
      }
      state.bonds = bonds;
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
          context.commit("addAtom", { type: "carbon", symbol: "C", x, y });
          context.commit("setClickMode", ClickMode.NORMAL);
          break;
        case ClickMode.ADD_HYDROGEN:
          context.commit("addAtom", {
            type: "hydrogen",
            symbol: "H",
            x,
            y,
          });
          context.commit("setClickMode", ClickMode.NORMAL);
          break;
        case ClickMode.ADD_BOND: {
          // Find which atom is clicked
          let clickedAtom = findClickedAtom(context.state.atoms, x, y);
          if (!clickedAtom) {
            break;
          }

          let startAtom = context.state.bondStartAtom;
          if (startAtom) {
            if (clickedAtom != startAtom) {
              // Add bond
              context.commit("addBond", [
                context.state.bondStartAtom,
                clickedAtom,
              ]);
              // Reset
              context.commit("setBondStartAtom", null);
              context.commit("setClickMode", ClickMode.NORMAL);
            } else {
              // Clicking on same atom gets ignored
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
