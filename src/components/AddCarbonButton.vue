<template>
  <button @click="setAddCarbon">
    <span>
      <carbon-atom />
      <span>Carbon</span>
    </span>
  </button>
</template>

<script>
import { mapActions } from "vuex";
import { ClickMode } from "../store/constants";
import CarbonAtom from "./CarbonAtom.vue";

export default {
  name: "AddCarbonButton",
  components: { CarbonAtom },
  methods: {
    ...mapActions(["setClickMode"]),
    setAddCarbon() {
      this.setClickMode(ClickMode.ADD_CARBON);
    }
  }
};
</script>

<style scoped>
button {
  border: 0;
}

button > span {
  display: flex;
  flex-direction: column;
  font-size: 18px;
  margin: 4px 0px 4px 0px;
}
</style>
