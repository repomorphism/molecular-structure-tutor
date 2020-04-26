<template>
  <button @click="setAddHydrogen">
    <span>
      <hydrogen-atom />
      <span>Hydrogen</span>
    </span>
  </button>
</template>

<script>
import { mapActions } from "vuex";
import { ClickMode } from "../store/constants";
import HydrogenAtom from "./HydrogenAtom.vue";

export default {
  name: "AddHydrogenButton",
  components: { HydrogenAtom },
  methods: {
    ...mapActions(["setClickMode"]),
    setAddHydrogen() {
      this.setClickMode(ClickMode.ADD_HYDROGEN);
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

svg {
  position: relative;
  min-height: 60px;
  margin: 0 0 8px 0;
}
</style>
