<template>
  <svg
    ref="parent-svg"
    @click="onClick"
    @mousedown="onMouseEvent"
    @mouseup="onMouseEvent"
    @mousemove="onMouseEvent"
  >
    <atoms-bond v-for="(bond, key) in bonds" v-bind:key="key" v-bind:bond="bond" />
    <component
      v-for="(atom, index) in atoms"
      v-bind:key="atom.type + index"
      v-bind:is="atom.type + '-atom'"
      v-bind:x="atom.x"
      v-bind:y="atom.y"
      v-bind:isHighlighted="highlightedAtoms.includes(atom)"
    />
  </svg>
</template>

<script>
import { mapActions } from "vuex";
import store from "../store";
import CarbonAtom from "./CarbonAtom.vue";
import HydrogenAtom from "./HydrogenAtom.vue";
import AtomsBond from "./AtomsBond.vue";

export default {
  name: "MainCanvas",
  components: { CarbonAtom, HydrogenAtom, AtomsBond },
  methods: {
    ...mapActions(["performCanvasAction", "handleDragAction"]),
    onClick(event) {
      const svg = this.$refs["parent-svg"];
      var point = svg.createSVGPoint();
      point.x = event.clientX - 30;
      point.y = event.clientY - 30;

      // The cursor point, translated into svg coordinates
      var cursorPoint = point.matrixTransform(svg.getScreenCTM().inverse());

      this.performCanvasAction({ x: cursorPoint.x, y: cursorPoint.y });
    },
    onMouseEvent(event) {
      const svg = this.$refs["parent-svg"];
      var point = svg.createSVGPoint();
      point.x = event.clientX - 30;
      point.y = event.clientY - 30;
      var cursorPoint = point.matrixTransform(svg.getScreenCTM().inverse());
      this.handleDragAction({
        type: event.type,
        x: cursorPoint.x,
        y: cursorPoint.y
      });
    }
  },
  computed: {
    atoms() {
      return store.state.atoms;
    },
    bonds() {
      return store.state.bonds;
    },
    highlightedAtoms() {
      return store.state.highlightedAtoms;
    }
  }
};
</script>

<style scoped>
header {
  height: 58px;
}
</style>
