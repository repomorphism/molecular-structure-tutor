<template>
  <section>
    <div>
      <span>Feedback:{{feedback}}</span>
    </div>
  </section>
</template>

<script>
import store from "../store";
export default {
  name: "FeedbackBox",
  computed: {
    feedback() {
      return store.state.feedback;
    }
  }
};
</script>

<style scoped>
section {
  text-align: left;
  position: absolute;
  width: 530px;
  height: 54px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.16);
  border-radius: 10px 10px 10px 10px;
  position: absolute;
  margin-left: 40px;
  margin-right: auto;
  left: 0;
  right: 0;
  bottom: 46px;
}

section > div {
  display: flex;
  flex-direction: column;
  padding: 8px 8px 8px 8px;
}
</style>
