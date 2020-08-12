<template>
  <div>
    <h2>Katie</h2>
    <Cards v-bind:imageData="images" />
  </div>
</template>
<script>
import bikes from "../assets/bikes.jpg";
import bridge from "../assets/bridge.jpg";
import Cards from "../components/Cards";

export default {
  name: "Maria",
  components: {
    Cards,
  },
  data() {
    return {
      images: [
        {
          source: bikes,
          caption: "This is a test caption for the bikes picture",
          timestamp: 1597240326725,
        },
        {
          source: bridge,
          caption: "This is a test caption for the bridge picture",
          timestamp: 1597240348399,
        },
      ],
    };
  },
};
</script>
