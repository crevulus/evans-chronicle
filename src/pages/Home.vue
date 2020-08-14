<template>
  <div>
    <h2>Home</h2>
    <div v-for="item of maria" v-bind:key="item['id']">
      {{ item }}
    </div>
  </div>
</template>
<script>
import { mariaRef } from "../db";

export default {
  data() {
    return {
      test: "test",
      family: "",
    };
  },
  firebase: {
    maria: mariaRef,
  },
};
</script>
