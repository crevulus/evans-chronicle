<template>
  <p>{{locationData}}</p>
</template>
<script>
export default {
  name: "Geolocation",
  props: {
    address: {
      type: Object,
    },
  },
  data() {
    return {
      locationData: "",
    };
  },
  created() {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.address.df},${this.address.wf}&key=${process.env.VUE_APP_GEOCODE_API_KEY}&result_type=locality`
    ).then((res) => {
      res
        .json()
        .then(
          (data) => (this.locationData = data.results[0].formatted_address)
        );
    });
  },
};
</script>