<template>
  <div>
    <h2>Home</h2>
    <div v-for="item of pictures" v-bind:key="item.id">{{ item.caption }}</div>
  </div>
</template>
<script>
import { store } from "../db";

export default {
  data() {
    return {
      test: "test",
      family: "",
      pictures: store.pictures,
    };
  },
};
</script>
