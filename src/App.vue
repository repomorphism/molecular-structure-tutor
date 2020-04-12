<template>
  <div id="app">
    <navigation-bar />
    <header-bar />
    <section id="work-area">
      <svg />
      <items-drawer />
      <button id="done-button">DONE</button>
    </section>
  </div>
</template>

<script>
import NavigationBar from "./components/NavigationBar.vue";
import HeaderBar from "./components/HeaderBar.vue";
import ItemsDrawer from "./components/ItemsDrawer.vue";

export default {
  name: "App",
  components: {
    HeaderBar,
    NavigationBar,
    ItemsDrawer
  }
};
</script>

<style>
body {
  margin: 0;
}

#app {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#work-area {
  flex-grow: 1;
  position: relative;
}

svg {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: #fdfdfd;
}

#done-button {
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  bottom: 46px;
  width: 158px;
  height: 54px;
}
</style>
