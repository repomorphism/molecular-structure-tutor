<template>
  <div id="app">
    <navigation-bar />
    <header-bar />
    <section id="work-area">
      <main-canvas />
      <items-drawer />
      <feedback-box v-if="submitted" id="feedback-text"/>
      <button id="done-button" @click="onClick">DONE</button>
    </section>
  </div>
</template>

<script>
import store from "./store";
import NavigationBar from "./components/NavigationBar.vue";
import HeaderBar from "./components/HeaderBar.vue";
import ItemsDrawer from "./components/ItemsDrawer.vue";
import MainCanvas from "./components/MainCanvas.vue";
import FeedbackBox from "./components/FeedbackBox.vue";

export default {
  name: "App",
  components: {
    HeaderBar,
    NavigationBar,
    ItemsDrawer,
    MainCanvas,
    FeedbackBox
  },
  data: function() {
    return {
      submitted: true,     //submitted is false then no feedback box displayed
    };
  },
  methods: {
    onClick() {
      function findValueByPrefix(object, prefix) {
        for (var property in object) {
          if (property in object &&
             property.toString().startsWith(prefix)) {
             return property.split(",")[property.split(",").length - 1];
          }
        }
      }
      var elems = document.querySelectorAll(".boundaryAtom");
      [].forEach.call(elems, function(el) {
          el.classList.remove("boundaryAtom");
      });
      var atomCount = {}, bondCount = {}, bondids = {}, flag = false, i, j, k, feedbackBG, nobonds=true;   //atomCount is count of atoms in canvas right now
      var temp = this.molecule.split(/([0-9]+)/);     //separating molecule into array of [symbol, count]
      for (j = 0; j < temp.length-1; j += 2)
      {
        atomCount[temp[j]] = 0;
      }
      this.submitted = true;
      for (k in this.atoms) {
        if (k in this.atoms) {
          if (this.atoms[k].symbol in atomCount) {
            atomCount[this.atoms[k].symbol] = atomCount[this.atoms[k].symbol] + 1;
          }
          else {
            atomCount[this.atoms[k].symbol] = 1;
          }
        }
      }
      for (i = 0; i < temp.length-1; i += 2)
      {
        //console.log(i, atomCount[temp[i]], temp[i+1]);
        if (atomCount[temp[i]]<temp[i+1])
        {
          flag = true;
          this.feedback = "The " + temp[i] + " atoms are missing. Add more " + temp[i] + " atoms from the sidebar";
          break;
        }
        if (atomCount[temp[i]]>temp[i+1])
        {
          flag = true;
          this.feedback = "The " + temp[i] + " atoms are more than required. See the question carefully  and start again";
          break;
        }
      }
      if (flag==false)
      {
        for (k in this.bonds) {
          if (k in this.bonds) {
            if ([this.bonds[k].atom1.symbol, this.bonds[k].atom2.symbol, this.bonds[k].count] in bondCount) {
              if(this.bonds[k].atom1.symbol==this.bonds[k].atom1.symbol) {
                bondCount[[this.bonds[k].atom1.symbol, this.bonds[k].atom2.symbol, this.bonds[k].count]] = bondCount[[this.bonds[k].atom1.symbol, this.bonds[k].atom2.symbol, this.bonds[k].count]] + 1;
                bondids[[this.bonds[k].atom1.symbol, this.bonds[k].atom2.symbol]].push(this.bonds[k].count);
              }
              else {
                bondCount[[this.bonds[k].atom1.symbol, this.bonds[k].atom2.symbol, this.bonds[k].count]] = bondCount[[this.bonds[k].atom1.symbol, this.bonds[k].atom2.symbol, this.bonds[k].count]] + 1;
                bondCount[[this.bonds[k].atom2.symbol, this.bonds[k].atom1.symbol, this.bonds[k].count]] = bondCount[[this.bonds[k].atom2.symbol, this.bonds[k].atom1.symbol, this.bonds[k].count]] + 1;
                bondids[[this.bonds[k].atom1.symbol, this.bonds[k].atom2.symbol]].push(this.bonds[k].count);
                bondids[[this.bonds[k].atom2.symbol, this.bonds[k].atom1.symbol]].push(this.bonds[k].count);
              }
            }
            else {
              bondCount[[this.bonds[k].atom1.symbol, this.bonds[k].atom2.symbol, this.bonds[k].count]] = 1;
              bondCount[[this.bonds[k].atom2.symbol, this.bonds[k].atom1.symbol, this.bonds[k].count]] = 1;
              bondids[[this.bonds[k].atom1.symbol, this.bonds[k].atom2.symbol]] = [this.bonds[k].count];
              bondids[[this.bonds[k].atom1.symbol, this.bonds[k].atom2.symbol]] = [this.bonds[k].count];
            }
            console.log(bondCount);
            nobonds=false;
          }
        }
        for (k in this.moleculeBonds) {
          if (k in this.moleculeBonds) {
            temp = JSON.parse(k);//findValueByPrefix(obj, "key1")
            console.log(typeof(k), k, typeof(temp), temp, bondCount[temp[0]+','+temp[1]+','+temp[2]], bondids[temp[0]+','+temp[1]], this.moleculeBonds[k]);
            if (bondCount[temp[0]+','+temp[1]+','+temp[2]]) {
              if (bondCount[temp[0]+','+temp[1]+','+temp[2]] < this.moleculeBonds[k]) {
                flag = true;
                this.feedback = "The number of bonds between " + temp[0] + " and " + temp[1] + " are incorrect.";
                //element.classList.add("highlightSVG");
                break;
              }
              else if (bondCount[temp[0]+','+temp[1]+','+temp[2]] > this.moleculeBonds[k]) {
                flag = true;
                this.feedback = "The number of bonds between " + temp[0] + " and " + temp[1] + " are incorrect.";
                break;
              }
            }
            else {
              if(findValueByPrefix(bondCount, temp[0]+','+temp[1])) {
                if(findValueByPrefix(bondCount, temp[0]+','+temp[1])<temp[2]) {
                  flag = true;
                  this.feedback = "The number of bonds between " + temp[0] + " and " + temp[1] + " can be more.";
                  break;
                }
                else if(findValueByPrefix(bondCount, temp[0]+','+temp[1])>temp[2]) {
                  flag = true;
                  this.feedback = "The number of bonds between " + temp[0] + " and " + temp[1] + " cannot be so many. Think about how many valence electrons are there and start again.";
                  break;
                }
                else {
                  console.log("Something is wrong"); //this condition shouldn't be possible
                }
              }
              else {
                flag = true;
                this.feedback = "There can be a bond between " + temp[0] + " and " + temp[1] + ".";
                break;
              }
            }
          }
        }
        if (nobonds==true) {
          flag = true;
          this.feedback = "There are no bonds.";
        }
      }
      if (flag==false) {
        this.feedback = "Good Job!";
        feedbackBG = document.getElementById("feedback-text");
        feedbackBG.className = "";
        feedbackBG.className += "feedback-correct";
      }
      else {
        feedbackBG = document.getElementById("feedback-text");
        feedbackBG.className = "";
        feedbackBG.className += "feedback-incorrect";
      }
    }
  },
  computed: {
    molecule() {
      return store.state.molecule;
    },
    moleculeBonds() {
      return store.state.moleculeBonds;
    },
    atoms() {
      return store.state.atoms;
    },
    bonds() {
      return store.state.bonds;
    },
    feedback: {
      get: function() {
        return store.state.feedback;
      },
      set: function(calcFeedback) {
        store.state.feedback = calcFeedback;
      }
    }
  }
};
</script>

<style>
body {
  margin: 0;
}

#app {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#work-area {
  flex-grow: 1;
  position: relative;
}

svg {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: #fdfdfd;
}

#done-button {
  position: absolute;
  margin-left: auto;
  margin-right: 40px;
  left: 0;
  right: 0;
  bottom: 46px;
  width: 158px;
  height: 54px;
}

.feedback-correct {
  background-color: rgba(0, 255, 0, 0.4);
}

.feedback-incorrect {
  background-color: rgba(255, 0, 0, 0.4);
}
</style>
