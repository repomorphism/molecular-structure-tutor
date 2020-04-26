<template>
  <button @click="setAddBond">
    <span>
      <svg
        width="31"
        height="31"
        viewBox="0 0 31 31"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="9" y1="21" x2="23" y2="9" stroke="#4E4E4E" stroke-width="2" />
      </svg>
      <span>Bond</span>
    </span>
  </button>
</template>

<script>
import { mapActions } from "vuex";
import { ClickMode } from "../store/constants";

export default {
  name: "AddBondButton",
  methods: {
    ...mapActions(["setClickMode"]),
    setAddBond() {
      this.setClickMode(ClickMode.ADD_BOND);
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
  margin: 0 0 4px 0;
}

svg {
  position: relative;
  min-height: 60px;
}
</style>
