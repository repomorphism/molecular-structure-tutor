<template>
  <div>
    <div v-for="definefeed in definefeeds" v-bind:key="definefeed.id" class="feedback">
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
    </div>
      <div>
        <button>ADD A NEW FEEDBACK CONDITION</button>
      </div>
  </div>
</template>

<script>
// import { mapActions } from "vuex";
// import store from "../store";

export default {
  name: "FeedbackCanvas",
  data() {
   return {
     definefeeds: [
       {  id: 1,
          condition: 'If [atom_symbol] are missing',
          feedback: 'That won’t work because the number of [atom_symbol] atoms you put is not the same as the molecule in question. Put more [atom_symbol] in the canvas and try again.',
          edit: false},
          {  id: 2,
             condition: 'If [atom_symbol] are extra',
             feedback: 'That won’t work because the number of [atom_symbol] atoms you put is not the same as the molecule in question. Delete the extra [atom_symbol] in the canvas and try again.',
             edit: false},
             {  id: 3,
                condition: 'If [atom_symbol] is not in any bond',
                feedback: 'That won’t work because all atoms should have atleast one bond with other atoms. Add bonds for [atom_symbol].',
                edit: false},
                {  id: 4,
                   condition: 'If the bonds between [atom_symbol 1] and [atom_symbol 2] are missing',
                   feedback: 'That won’t work because [number_of_bond] is not the required bond number between [atom_symbol 1] and [atom_symbol 2]. Add the missing bonds to reach the required bond number.',
                   edit: false},
                   {  id: 5,
                      condition: 'If the bonds between [atom_symbol 1] and [atom_symbol 2] are extra',
                      feedback: 'That won’t work because [number_of_bond] is not the required bond number between [atom_symbol 1] and [atom_symbol 2]. Delete the extra bonds to reach the required bond number.',
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
button {
  position: absolute;
  margin-left: 40px;
  margin-right: auto;
  left: 0;
  right: 0;
  bottom: 46px;
  width: 400px;
  height: 44px;
  background: #425AF2;
  border-radius: 46px;
  font-size: 16px;
  color:#FFFFFF;
  font-style: normal;
  font-weight: bold;
  border: none;
}
</style>
