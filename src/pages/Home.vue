<template>
  <div>
    <h2>Home</h2>
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
  },
  methods: {
    renderImages(collection) {
      getHomeImages(collection).then((data) => this.picturesData.push([data]));
      this.dataLoaded = true;
    },
  },
};
</script>
