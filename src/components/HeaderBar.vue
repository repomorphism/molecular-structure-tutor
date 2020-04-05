<template>
  <header>
    <div id="title-texts">
      <h3>Practice</h3>
      <h2>Draw the molecular structure of C2H4</h2>
    </div>
    <button>STEP BREAKDOWN</button>
  </header>
</template>

<script>
export default {
  name: "HeaderBar"
};
</script>

<style scoped>
header {
  height: 96px;
  margin: 0;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 2px solid lightgray;
}

#title-texts {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

h3 {
  font-size: 12px;
  line-height: 15px;
  color: #999999;
}

h2 {
  margin: 0;
  font-family: Poppins;
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 150%;
  /* or 33px */
  color: #333333;
}
</style>
