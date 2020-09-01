<template>
  <div>
    <div v-for="data in imageData" :key="data.id">
      <div class="card">
        <img :src="data.source" :alt="data.caption" class="card-img" />
        <div class="text-box">
          <p>{{ moment(data.timestamp.toDate()).format("MMM Do YYYY") }}</p>
          <p>{{ data.caption }}</p>
          <p>{{ reverseGeocode(data.location.df, data.location.wf) }}</p>
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
      decodedAddresses: [],
    };
  },
  created() {
    this.reverseGeocode(40.714224, -73.961452).then((data) =>
      console.log(data)
    );
  },
  methods: {
    async reverseGeocode(lat, long) {
      await axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${process.env.VUE_APP_GEOCODE_API_KEY}&result_type=locality`
        )
        .then((res) => {
          return res.data.results[0].formatted_address;
        });
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
</style>
