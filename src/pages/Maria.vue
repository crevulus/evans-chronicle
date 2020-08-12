<template>
  <div>
    <h2>Maria</h2>
  </div>
</template>
<script>
import arrow from "../assets/arrow.jpg";

export default {
  name: "Maria",
  data() {
    return {
      images: [
        {
          source: arrow,
          caption: "This is a test caption for the arrow picture",
          timestamp: 1597216974189,
        },
      ],
    };
  },
};
</script>
<style></style>
