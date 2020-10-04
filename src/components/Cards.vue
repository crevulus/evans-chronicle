<template>
  <div v-bind:class="{ 'cards-container-not-home': notHome }">
    <div v-for="data in imageData" :key="data.id">
      <div class="card">
        <img :src="data.source" :alt="data.caption" class="card-img" />
        <div class="text-box">
          <p>{{ moment(data.timestamp.toDate()).format("MMM Do YYYY") }}</p>
          <p>{{ data.caption }}</p>
          <Geolocation v-bind:address="data.location" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import axios from "axios";
import Geolocation from "./Geolocation";

export default {
  name: "Cards",
  components: {
    Geolocation,
  },
  props: {
    imageData: {
      type: Array,
    },
  },
  data() {
    return {
      loaded: false,
      imageAnnotations: "",
    };
  },
  computed: {
    notHome() {
      return this.$route.path !== "/";
    },
  },
};
</script>
<style>
.card {
  max-width: 70%;
  margin: auto;
  margin-bottom: 4em;
  border: 1px solid #555;
  border-radius: 5px;
  box-shadow: 1px 1px 4px #555;
}

.text-box {
  margin: 1em;
}

.card-img {
  max-width: 100%;
  display: block;
  margin: auto;
}

@media screen and (min-width: 1000px) {
  .cards-container-not-home {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}
</style>
