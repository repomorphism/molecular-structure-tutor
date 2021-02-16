<style>

body {
    margin: 0;
}

#app {
    width: 100vw;
    height: 100vh;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#app > div {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
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

#role-button {
    position: absolute;
    margin-left: auto;
    margin-right: 225px;
    left: 0;
    right: 0;
    top: 68px;
    width: 162px;
    height: 44px;
    background: #F3F4FE;
    border-radius: 46px;
    font-size: 16px;
    color:#6076EF;
    font-style: normal;
    font-weight: bold;
    border: none;
}

#publish-button {
    position: absolute;
    margin-left: auto;
    margin-right: 40px;
    left: 0;
    right: 0;
    top: 68px;
    width: 162px;
    height: 44px;
    background: #F3F4FE;
    border-radius: 46px;
    font-size: 16px;
    color:#6076EF;
    font-style: normal;
    font-weight: bold;
    border: none;
}

#add-question-button {
    position: absolute;
    margin-left: auto;
    margin-right: 414px;
    left: 0;
    right: 0;
    top: 68px;
    width: 200px;
    height: 44px;
    background: #F3F4FE;
    border-radius: 46px;
    font-size: 16px;
    color:#6076EF;
    font-style: normal;
    font-weight: bold;
    border: none;
}

.feedback-correct {
    background-color: rgba(0, 255, 0, 0.4);
}

.feedback-incorrect {
    background-color: rgba(255, 0, 0, 0.4);
}

header {
  height: 67px;
  margin: 0;
  padding: 8px 0px 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.tablink {
  width: 200px;
  padding: 7px 35px;
  text-align: center;
  display: inline-block;
  float:left;
}

#tabs {
  height: 29px;
  border-bottom: 2px solid lightgray;
}

#select-question {
  position: absolute;
  margin-left: 40px;
  margin-right: auto;
  left: 0;
  right: 0;
  top: 68px;
  width: 150px;
  height: 44px;
  background: #425AF2;
  border-radius: 46px;
  font-size: 16px;
  color:#FFFFFF;
  font-style: normal;
  font-weight: bold;
  border: none;
}

#feedback-text {
  display: none;
}
</style>

<template>

<div id="app">
    <div v-if="userRole == 'teacher'">
        <navigation-bar />
        <header>
          <select id="select-question">
            <option value="C2H2">{{this.molecule}}</option>
          </select>
          <button id="add-question-button">Add question</button>
          <button id="role-button" @click="setUserRole('student')">Test Drive</button>
          <button id="publish-button">Publish</button>
        </header>
        <div id="tabs">
          <button class="tablink" @click="openTab(['define_answers', 'define_item'])" id="defaultOpen">Define Answers</button>
          <button class="tablink" @click="openTab(['define_feedback'])">Define Feedback</button>
          <button class="tablink" @click="openTab(['define_hints'])">Define Hints</button>
        </div>
        <section id="work-area">
            <main-canvas id="define_answers" class="tabcontent"/>
            <items-drawer id="define_item" class="tabcontent"/>
            <feedback-canvas id="define_feedback" class="tabcontent"/>
            <hint-canvas id="define_hints" class="tabcontent"/>
        </section>
    </div>
    <div v-if="userRole == 'student'">
        <navigation-bar />
        <header-bar />
        <section id="work-area">
            <main-canvas />
            <items-drawer />
            <feedback-box id="feedback-text" />
            <button id="done-button" @click="onClick">DONE</button>
        </section>
    </div>
</div>

</template>

<script>
import store from "./store";
import {
    mapActions
}
from "vuex";
import NavigationBar from "./components/NavigationBar.vue";
import HeaderBar from "./components/HeaderBar.vue";
import ItemsDrawer from "./components/ItemsDrawer.vue";
import MainCanvas from "./components/MainCanvas.vue";
import FeedbackCanvas from "./components/FeedbackCanvas.vue";
import HintCanvas from "./components/HintCanvas.vue";
import FeedbackBox from "./components/FeedbackBox.vue";

export default {
    name: "App",
    components: {
        HeaderBar,
        NavigationBar,
        ItemsDrawer,
        MainCanvas,
        FeedbackBox,
        FeedbackCanvas,
        HintCanvas
    },
    data: function() {
        return {
            userRole: "teacher"  //userRole: "student/teacher",
        };
    },
    methods: {
        ...mapActions(["setHighlightedAtoms"]),
            openTab(tabNames) {
              var i, tabcontent, tablinks;
              tabcontent = document.getElementsByClassName("tabcontent");
              for (i = 0; i < tabcontent.length; i++) {
                tabcontent[i].style.display = "none";
              }
              tablinks = document.getElementsByClassName("tablink");
              for (i = 0; i < tablinks.length; i++) {
                tablinks[i].style.backgroundColor = "";
              }
              for (i = 0; i < tabNames.length; i++) {
                document.getElementById(tabNames[i]).style.display = "block";
              }
            },
            onClick() {
                this.setHighlightedAtoms([]);
                function findValueByPrefix(object, prefix) {
                    for (var property in object) {
                        if (property in object && property.toString().startsWith(prefix)) {
                            return property.split(",")[property.split(",").length - 1];
                        }
                    }
                }

                function findValueBySuffix(object, prefix, suffix) {
                    for (var property in object) {
                        if (property in object && property.toString().startsWith(prefix) && !property.toString().endsWith(suffix)) {
                            return property;
                        }
                    }
                }
                var elems = document.querySelectorAll(".boundaryAtom");
                [].forEach.call(elems, function(el) {
                    el.classList.remove("boundaryAtom");
                });
                var atomCount = {},
                    bondCount = {},
                    atomids = {},
                    bondids = {},
                    flag = false,
                    i,
                    j,
                    k,
                    nobonds = true; //atomCount is count of atoms in canvas right now
                var temp = this.molecule.split(/([0-9]+)/); //separating molecule into array of [symbol, count]
                for (j = 0; j < temp.length - 1; j += 2) {
                    atomCount[temp[j]] = 0;
                }
                for (k in this.atoms) {
                    if (k in this.atoms) {
                        if (this.atoms[k].symbol in atomids) {
                            atomCount[this.atoms[k].symbol] =
                                atomCount[this.atoms[k].symbol] + 1;
                            atomids[this.atoms[k].symbol].push(this.atoms[k]);
                        } else {
                          atomCount[this.atoms[k].symbol] =
                              atomCount[this.atoms[k].symbol] + 1;
                            atomids[this.atoms[k].symbol]=[this.atoms[k]];
                        }
                    }
                }
                for (i = 0; i < temp.length - 1; i += 2) {
                    console.log(temp[i],atomids[temp[i]]);
                    if (atomCount[temp[i]] < temp[i + 1]) {
                        flag = true;
                        this.setHighlightedAtoms(atomids[temp[i]]);
                        this.feedback =
                            "That won’t work because the number of "+temp[i]+" atoms you put is not the same as the molecule in question. Put more "+temp[i]+" in the canvas and try again.";
                        break;
                    }
                    if (atomCount[temp[i]] > temp[i + 1]) {
                        flag = true;
                        this.feedback =
                            "That won’t work because the number of "+temp[i]+" atoms you put is not the same as the molecule in question. Delete the extra [atom_symbol] in the canvas and try again.";
                        break;
                    }
                }
                if (flag == false) {
                    for (k in this.bonds) {
                        if (k in this.bonds) {
                            if ([this.bonds[k].atom1.symbol, this.bonds[k].atom2.symbol, this.bonds[k].count] in bondCount) {
                                if (this.bonds[k].atom1.symbol == this.bonds[k].atom2.symbol) {
                                    bondCount[[this.bonds[k].atom1.symbol, this.bonds[k].atom2.symbol, this.bonds[k].count]] = bondCount[[this.bonds[k].atom1.symbol, this.bonds[k].atom2.symbol, this.bonds[k].count]] + 1;
                                    bondids[[this.bonds[k].atom1.symbol, this.bonds[k].atom2.symbol, this.bonds[k].count]].push(k);
                                } else {
                                    bondCount[[this.bonds[k].atom1.symbol, this.bonds[k].atom2.symbol, this.bonds[k].count]] = bondCount[[this.bonds[k].atom1.symbol, this.bonds[k].atom2.symbol, this.bonds[k].count]] + 1;
                                    bondCount[[this.bonds[k].atom2.symbol, this.bonds[k].atom1.symbol, this.bonds[k].count]] = bondCount[[this.bonds[k].atom2.symbol, this.bonds[k].atom1.symbol, this.bonds[k].count]] + 1;
                                    bondids[[this.bonds[k].atom1.symbol, this.bonds[k].atom2.symbol, this.bonds[k].count]].push(k);
                                    bondids[[this.bonds[k].atom2.symbol, this.bonds[k].atom1.symbol, this.bonds[k].count]].push(k);
                                }
                            } else {
                                bondCount[[this.bonds[k].atom1.symbol, this.bonds[k].atom2.symbol, this.bonds[k].count]] = 1;
                                bondCount[[this.bonds[k].atom2.symbol, this.bonds[k].atom1.symbol, this.bonds[k].count]] = 1;
                                bondids[[this.bonds[k].atom1.symbol, this.bonds[k].atom2.symbol, this.bonds[k].count]] = [k];
                                bondids[[this.bonds[k].atom2.symbol, this.bonds[k].atom1.symbol, this.bonds[k].count]] = [k];
                            }
                            console.log(k, bondCount);
                            nobonds = false;
                        }
                    }
                    for (k in bondids) {
                        if (k in bondids) {
                          console.log(k, bondids[k]);
                        }
                    }
                    for (k in this.moleculeBonds) {
                        if (k in this.moleculeBonds) {
                            temp = JSON.parse(k); //findValueByPrefix(obj, "key1")
                            console.log(
                                typeof k,
                                k,
                                typeof temp,
                                temp,
                                bondCount[temp[0] + "," + temp[1] + "," + temp[2]],
                                findValueBySuffix(bondids, [temp[0] + "," + temp[1]], temp[2]),
                                bondids[findValueBySuffix(bondids, [temp[0] + "," + temp[1]], temp[2])],
                                this.bonds[bondids[findValueBySuffix(bondids, [temp[0] + "," + temp[1]], temp[2])]],
                                this.moleculeBonds[k]
                            );
                            if (bondCount[temp[0] + "," + temp[1] + "," + temp[2]]) {
                                if (bondCount[temp[0] + "," + temp[1] + "," + temp[2]] < this.moleculeBonds[k]) {
                                    //this.setHighlightedAtoms([this.bonds[bondids[findValueBySuffix(bondids, [temp[0] + "," + temp[1]], temp[2])]].atom1, this.bonds[bondids[findValueBySuffix(bondids, [temp[0] + "," + temp[1]], temp[2])]].atom2]);
                                    flag = true;
                                    this.feedback =
                                        "The number of bonds between " +
                                        temp[0] +
                                        " and " +
                                        temp[1] +
                                        " are incorrect.";
                                    break;
                                } else if (bondCount[temp[0] + "," + temp[1] + "," + temp[2]] > this.moleculeBonds[k]) {
                                    //this.setHighlightedAtoms([this.bonds[bondids[findValueBySuffix(bondids, [temp[0] + "," + temp[1]], temp[2])]].atom1, this.bonds[bondids[findValueBySuffix(bondids, [temp[0] + "," + temp[1]], temp[2])]].atom2]);
                                    flag = true;
                                    this.feedback =
                                        "The number of bonds between " +
                                        temp[0] +
                                        " and " +
                                        temp[1] +
                                        " are incorrect.";
                                    break;
                                }
                            } else {
                                if (findValueByPrefix(bondCount, temp[0] + "," + temp[1])) {
                                    if (
                                        findValueByPrefix(bondCount, temp[0] + "," + temp[1]) <
                                        temp[2]
                                    ) {
                                        console.log(this.bonds[bondids[findValueBySuffix(bondids, [temp[0] + "," + temp[1]], temp[2])]]);
                                        this.setHighlightedAtoms([this.bonds[bondids[findValueBySuffix(bondids, [temp[0] + "," + temp[1]], temp[2])]].atom1, this.bonds[bondids[findValueBySuffix(bondids, [temp[0] + "," + temp[1]], temp[2])]].atom2]);
                                        flag = true;
                                        this.feedback =
                                            "That won’t work because "+findValueByPrefix(bondCount, temp[0] + "," + temp[1])+" is not the required bond number between "+temp[0]+" and "+temp[1]+". Add the missing bonds to reach the required bond number.";
                                        break;
                                    } else if (
                                        findValueByPrefix(bondCount, temp[0] + "," + temp[1]) >
                                        temp[2]
                                    ) {
                                      this.setHighlightedAtoms([this.bonds[bondids[findValueBySuffix(bondids, [temp[0] + "," + temp[1]], temp[2])]].atom1, this.bonds[bondids[findValueBySuffix(bondids, [temp[0] + "," + temp[1]], temp[2])]].atom2]);
                                        flag = true;
                                        this.feedback =
                                            "That won’t work because "+findValueByPrefix(bondCount, temp[0] + "," + temp[1])+" is not the required bond number between "+temp[0]+" and "+temp[1]+". Delete the extra bonds to reach the required bond number.";
                                        break;
                                    } else {
                                        console.log("Something is wrong"); //this condition shouldn't be possible
                                    }
                                } else {
                                    flag = true;
                                    this.feedback =
                                        "There can be a bond between " +
                                        temp[0] +
                                        " and " +
                                        temp[1] +
                                        ".";
                                    break;
                                }
                            }
                        }
                    }
                    if (nobonds == true) {
                        flag = true;
                        this.feedback = "There are no bonds.";
                    }
                }
                document.getElementById("feedback-text").style.display = "block";
                if (flag == false) {
                    this.feedback = "Good Job!";
                    document.getElementById("feedback-text").className = "feedback-correct";
                } else {
                    document.getElementById("feedback-text").className = "feedback-incorrect";
                }
            },
            setUserRole(role) {
                this.userRole = role;
            }
    },
    mounted(){
        document.getElementById("defaultOpen").click();
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
