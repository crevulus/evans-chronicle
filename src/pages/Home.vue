<template>
  <div>
    <div class="title-container">
      <h1 class="md-display-4 title">Evanstagram.</h1>
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
  color: #888;
}

h2 {
  text-align: center;
}

@media screen and (min-width: 1350px) {
  .cards-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }
}

@media screen and (min-width: 1000px) {
  .cards-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 700px) {
  .title-container {
    max-width: 100%;
  }

  .title {
    font-size: 17vw
  }
}


</style>
