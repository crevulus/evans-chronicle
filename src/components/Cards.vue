<template>
  <div>
    <div v-for="data in imageData" :key="data.id">
      <div class="card">
        <img :src="data.source" :alt="data.caption" class="card-img" />
        <div class="text-box">
          <p>{{ moment(data.timestamp.toDate()).format("MMM Do YYYY") }}</p>
          <p>{{ data.caption }}</p>
          <p>{{reverseGeocode(data.location.df, data.location.wf)}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Cards",
  props: {
    imageData: {
      type: Array,
    },
  },
  mounted() {},
  methods: {
    reverseGeocode: (lat, long) => {
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyBMB0WSdQOnDD5XSt2S41eV-4z2-IwzOQk&result_type=locality`
      ).then((res) =>
        res.json().then((data) => {
          console.log(data.results[0].formatted_address);
          return data.results[0].formatted_address;
        })
      );
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
