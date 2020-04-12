<template>
  <section>
    <div @click="onclick">
      <add-carbon-button />
      <add-hydrogen-button />
      <div class="divide-bar"></div>
      <add-bond-button />
    </div>
  </section>
</template>

<script>
import AddHydrogenButton from "./AddHydrogenButton.vue";
import AddCarbonButton from "./AddCarbonButton.vue";
import AddBondButton from "./AddBondButton.vue";

export default {
  name: "ItemsDrawer",
  components: { AddHydrogenButton, AddCarbonButton, AddBondButton },
  methods: {
    onclick() {
      //   console.log("clicked on div");
    }
  }
};
</script>

<style scoped>
section {
  position: absolute;
  width: 107px;
  height: 330px;
  left: 40px;
  top: 81px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.16);
  border-radius: 0px 10px 10px 0px;
}

section > div {
  display: flex;
  flex-direction: column;
  padding: 8px 0 8px 0;
}

/* section div * {
  margin: 8px 0px 8px 0px;
} */

.divide-bar {
  width: 100%;
  height: 0px;
  border: 1px solid #e4e4e4;
  margin: 12px 0px 12px 0px;
}

svg {
  position: relative;
}
</style>
