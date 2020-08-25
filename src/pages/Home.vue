<template>
  <div>
    <h2>Home</h2>
    <div v-if="this.dataLoaded" class="cards-container">
      <div v-for="picture in picturesData" :key="picture.id" class="card">
        <img :src="picture.source" :alt="picture.caption" class="card-img" />
        <div class="text-box">
          <p>{{ moment(picture.timestamp.toDate()).format("MMM Do YYYY") }}</p>
          <p>{{ picture.caption }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { db } from "../db";

export default {
  components: {},
  data: () => ({
    test: "test",
    family: "",
    dataLoaded: true,
    picturesData: [],
  }),
  mounted() {
    this.getEvents();
  },
  methods: {
    async getEvents() {
      // instead of using promises/thens
      let snapshot = await db
        .collection("Maria")
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
    },
  },
};
</script>
