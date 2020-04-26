<template>
  <button @click="setAddHydrogen">
    <span>
      <svg
        width="31"
        height="31"
        viewBox="0 0 31 31"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="15.4243" cy="15.2727" rx="14.8485" ry="15.1515" fill="#7DAEE9" />
        <path
          d="M8.82623 22.3638V6.52979H12.1026V12.5669H18.2901V6.52979H21.5772V22.3638H18.2901V15.2954H12.1026V22.3638H8.82623Z"
          fill="white"
        />
      </svg>
      <span>Hydrogen</span>
    </span>
  </button>
</template>

<script>
import { mapActions } from "vuex";
import { ClickMode } from "../store/constants";

export default {
  name: "AddHydrogenButton",
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
