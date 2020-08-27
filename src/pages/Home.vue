<template>
  <div>
    <h2>Home</h2>
    <div v-if="this.dataLoaded" class="cards-container">
      <Cards v-bind:imageData="picturesData" />
    </div>
    <h4 v-else>Loading...</h4>
  </div>
</template>
<script>
import { db } from "../db";
import Cards from "../components/Cards";

export default {
  components: {
    Cards,
  },
  data: () => ({
    dataLoaded: false,
    picturesData: [],
  }),
  mounted() {
    this.getImages("Maria");
  },
  methods: {
    async getImages(document) {
      // instead of using promises/thens
      let snapshot = await db
        .collection(document)
        .orderBy("timestamp", "desc")
        .limit(1)
        .get();
      let firstPicturesData;
      snapshot.forEach((doc) => {
        let appData = doc.data();
        appData.id = doc.id;
        firstPicturesData = appData;
      });
      this.picturesData.push(firstPicturesData);
      this.dataLoaded = true;
    },
  },
};
</script>
