<template>
  <div class="icon-and-text">
    <p><md-icon class="card-icon">explore</md-icon>{{ locationData }}</p>
  </div>
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
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.address.latitude},${this.address.longitude}&key=${process.env.VUE_APP_GEOCODE_API_KEY}&result_type=locality`
    ).then((res) => {
      res.json().then((data) => {
        return (this.locationData = data.results[0].formatted_address);
      });
    });
  },
};
</script>
