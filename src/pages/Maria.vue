<template>
  <div>
    <h2>Maria</h2>
    <div v-for="img in images" :key="img.timestamp" class="cards-container">
      <div class="card">
        <img :src="img.source" alt="img.caption" class="card-img" />
        <p>{{ moment(img.timestamp).format("MMM Do YY") }}</p>
        <p>
          {{ img.caption }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import arrow from "../assets/arrow.jpg";
import big_door from "../assets/big_door.jpg";

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
        {
          source: big_door,
          caption: "This is a test caption for the big door picture",
          timestamp: 1597231561906,
        },
      ],
    };
  },
};
</script>
<style></style>
