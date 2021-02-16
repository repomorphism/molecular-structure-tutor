<template>
  <div>
    <!-- <div v-for="definefeed in definefeeds" v-bind:key="definefeed.id" class="feedback">
            <div class="condition">{{ definefeed.condition }}</div>
            <input class="inputedit"
                v-if="definefeed.edit"
                v-model="definefeed.feedback"
                @blur="definefeed.edit = false; $emit('update')"
                @keyup.enter="definefeed.edit=false; $emit('update')">
            <div v-else class="explanation" @click="definefeed.edit = true;">
                <label> {{definefeed.feedback}} </label>
            </div>
            <br>
    </div> -->
  </div>
</template>

<script>
// import { mapActions } from "vuex";
// import store from "../store";

export default {
  name: "HintCanvas",
  data() {
   return {
     definefeeds: [
       {  id: 1,
          condition: 'If all electrons are not entered',
          feedback: 'C has 4 electrons and H has 2 electrons',
          edit: false},
       {  id: 2,
          condition: 'If all atoms are present',
          feedback: 'C2H4 has 2 carbons and 4 hydrogens',
          edit: false}
     ],
    editedDefinefeeds: null
   }
 },
 methods: {
     editDefinefeeds: function (definefeed) {
       this.editedDefinefeeds = definefeed;
     }
  }
};
// export default {
//   name: "MainCanvas",
//   methods: {
//     ...mapActions(["performCanvasAction"]),
//     onClick(event) {
//       console.log("editing feedback");
//     }
//   },
//   computed: {
//     feedback: {
//         get: function() {
//             return store.state.feedback;
//         },
//         set: function(calcFeedback) {
//             store.state.feedback = calcFeedback;
//         }
//     }
//   }
// };
</script>

<style scoped>
.condition {
  margin-left: 2%;
  text-align:left;
  width:96%;
  padding: 0.5%;
}
.condition:hover {
  background-color: #F3F4FE;
}
.explanation {
  margin-left: 5%;
  text-align:left;
  width:93%;
  padding: 0.5%;
}
.explanation:hover {
  background-color: #F3F4FE;
}
.inputedit {
  margin-left: 5%;
  width:93%;
  padding: 0.5%;
  vertical-align: middle;
}
</style>
