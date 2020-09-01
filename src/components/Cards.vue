<template>
  <div>
    <div v-for="data in imageAnnotations" :key="data.id">
      <div class="card">
        <img :src="data.source" :alt="data.caption" class="card-img" />
        <div class="text-box">
          <p>{{ moment(data.timestamp.toDate()).format("MMM Do YYYY") }}</p>
          <p>{{ data.caption }}</p>
          <p>{{ data.decodedAddress }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "Cards",
  props: {
    imageData: {
      type: Array,
    },
  },
  data() {
    return {
      imageAnnotations: "",
    };
  },
  created() {
    this.imageAnnotations = this.imageData;
    this.imageData.forEach((set, i) => {
      axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${set.location.df},${set.location.wf}&key=${process.env.VUE_APP_GEOCODE_API_KEY}&result_type=locality`
        )
        .then((res) => {
          console.log(res.data.results[0].formatted_address);
          // this.decodedAddresses.push(res.data.results[0].formatted_address);
          this.imageAnnotations[i].decodedAddress =
            res.data.results[0].formatted_address;
          return res.data.results[0].formatted_address;
        });
    });
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
</style>
