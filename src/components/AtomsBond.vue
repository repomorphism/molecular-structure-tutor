<template>
  <g v-bind:transform="geometry.transform">
    <line
      v-for="n in bond.count"
      v-bind:key="n"
      v-bind:x1="geometry.x1"
      v-bind:y1="geometry.y1 - 16 * (bond.count / 2 - n + 0.5)"
      v-bind:x2="geometry.x2"
      v-bind:y2="geometry.y2 - 16 * (bond.count / 2 - n + 0.5)"
      stroke="#4E4E4E"
      stroke-width="2"
    />
  </g>
</template>

<script>
export default {
  name: "AtomsBond",
  props: ["bond"], // { atom1, atom2, count }
  computed: {
    geometry() {
      const x1 = this.bond.atom1.x + 30;
      const y1 = this.bond.atom1.y + 30;
      const x2 = this.bond.atom2.x + 30;
      const y2 = this.bond.atom2.y + 30;
      const midX = (x1 + x2) / 2;
      const midY = (y1 + y2) / 2;
      //   const midY = (y1 + y2) / 2 - 16 * this.bond.count - 8;
      const length =
        Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)) - 60 - 8;
      const angle = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
      return {
        x1: midX - length / 2,
        y1: midY,
        x2: midX + length / 2,
        y2: midY,
        transform: `rotate(${angle}, ${midX}, ${midY})`
      };
    }
  }
};
</script>

<style scoped>
</style>
