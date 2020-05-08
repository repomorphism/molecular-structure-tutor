<template>
  <svg width="60" height="60" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="15.4243" cy="15.2727" rx="14.8485" ry="15.1515" fill="#7DAEE9" />
    <circle
      v-if="isHighlighted"
      class="boundaryAtom"
      cx="16.1212"
      cy="16.0606"
      r="15.1515"
      stroke="red"
      stroke-width="2"
    />
    <path
      d="M8.82623 22.3638V6.52979H12.1026V12.5669H18.2901V6.52979H21.5772V22.3638H18.2901V15.2954H12.1026V22.3638H8.82623Z"
      fill="white"
    />
  </svg>
</template>

<script>
export default {
  name: "HydrogenAtom",
  props: ["isHighlighted"]
};
</script>

<style scoped>
svg {
  position: relative;
  min-height: 60px;
  margin: 0 0 8px 0;
}
</style>
