<template>
  <div>
    <h2>Home</h2>
    <Cards v-if="dataLoaded" v-bind:imageData="this.pictures" />
  </div>
</template>
<script>
import { getData } from "../db";
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
    getData()
      .then((data) => JSON.stringify(data))
      .then((d) => JSON.parse(d))
      .then((item) => {
        this.pictures = item.pictures;
        this.dataLoaded = true;
      });
    console.log("h");
  },
};
</script>
