<template>
  <div>
    <div class="title-container">
      <h2 class="md-display-4">Evanstagram.</h2>
    </div>

    <div v-if="this.dataLoaded" class="cards-container">
      <div class="person-card">
        <h2>Maria</h2>
        <Cards v-bind:imageData="picturesData[0]" />
      </div>
      <div class="person-card">
        <h2>Paul</h2>
        <Cards v-bind:imageData="picturesData[1]" />
      </div>
      <div class="person-card">
        <h2>Katie</h2>
        <Cards v-bind:imageData="picturesData[2]" />
      </div>
      <div class="person-card">
        <h2>Christopher</h2>
        <Cards v-bind:imageData="picturesData[3]" />
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
    this.renderImages("Katie");
    this.renderImages("Christopher");
  },
  methods: {
    async renderImages(collection) {
      await getHomeImages(collection).then((data) =>
        this.picturesData.push([data])
      );
      this.dataLoaded = true;
    },
  },
};
</script>
<style scoped>
.title-container {
  display: flex;
  max-width: 100%;
  max-height: 8rem;
  justify-content: center;
}

.title {
  font-size: 5rem;
}

.title-crest {
  max-height: 4.5rem;
}

h2 {
  text-align: center;
}

@media screen and (min-width: 1000px) {
  .cards-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}
</style>
