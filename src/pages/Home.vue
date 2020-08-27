<template>
  <div>
    <div class="title-container">
      <h2 class="title">
        Evans
        <img src="../assets/evans.png" class="title-crest" /> Chronicle
      </h2>
    </div>

    <div v-if="this.dataLoaded" class="cards-container">
      <div>
        <h4>Maria</h4>
        <Cards v-bind:imageData="picturesData[0]" />
      </div>
      <div>
        <h4>Paul</h4>
        <Cards v-bind:imageData="picturesData[1]" />
      </div>
    </div>
    <h4 v-else>Loading...</h4>
  </div>
</template>
<script>
import { getHomeImages } from "../db";
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
    this.renderImages("Maria");
    this.renderImages("Paul");
    this.dataLoaded = true;
  },
  methods: {
    renderImages(collection) {
      getHomeImages(collection).then((data) => this.picturesData.push([data]));
    },
  },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,600&display=swap");

.title-container {
  display: flex;
  max-width: 100%;
  max-height: 8rem;
  justify-content: center;
}

.title {
  font-family: "Playfair Display", serif;
  font-size: 5rem;
}

.title-crest {
  max-height: 4.5rem;
}
</style>
