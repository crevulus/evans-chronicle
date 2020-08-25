<template>
  <div>
    <h2>Home</h2>
    <Cards v-if="dataLoaded" v-bind:imageData="this.pictures" />
  </div>
</template>
<script>
import { db } from "../db";
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
  // created() {
  //   getData()
  //     .then((data) => JSON.stringify(data))
  //     .then((d) => JSON.parse(d))
  //     .then((item) => {
  //       this.pictures = item.pictures;
  //       this.dataLoaded = true;
  //     });
  //   console.log("h");
  // },
  mounted() {
    this.getEvents();
  },
  methods: {
    async getEvents() {
      // instead of using promises/thens
      let snapshot = await db.collection("Maria").get();
      snapshot.forEach((doc) => {
        console.log(doc.data());
      });
    },
  },
};
</script>
