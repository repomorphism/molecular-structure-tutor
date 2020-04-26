<template>
  <svg @click="onClick" />
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "MainCanvas",
  methods: {
    ...mapActions(["performCanvasAction"]),
    onClick(event) {
      this.performCanvasAction(event);
    }
  }
};
</script>

<style scoped>
header {
  height: 58px;
}
</style>
