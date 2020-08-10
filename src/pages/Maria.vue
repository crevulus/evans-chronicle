<template>
  <div>
    <h2>Maria</h2>
    <img src="{{images[0]}}" />
  </div>
</template>
<script>
import arrow from "../assets/arrow.jpg";
export default {
  name: "Maria",
  data() {
    return {
      images: [arrow],
    };
  },
};
</script>
<style></style>
