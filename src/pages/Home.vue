<template>
  <div>
    <h2>Home</h2>
    <Cards v-if="dataLoaded" v-bind:imageData="pictures" />
  </div>
</template>
<script>
import { store } from "../db";
import Cards from "../components/Cards";

export default {
  components: {
    Cards,
  },
  data() {
    return {
      test: "test",
      family: "",
      pictures: null,
      dataLoaded: false,
    };
  },
  created() {
    this.pictures = store.pictures;
    console.log("created " + JSON.stringify(store.pictures));
    this.dataLoaded = true;
  },
};
</script>
