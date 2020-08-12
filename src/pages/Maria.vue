<template>
  <div>
    <h2>Maria</h2>
    <div v-for="img in images" :key="img.timestamp" class="img-caption">
      <img :src="img.source" />
      <p>{{ img.caption }}</p>
    </div>
    <v-card class="mx-auto" max-width="400">
      <v-img
        class="white--text align-end"
        height="200px"
        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      >
        <v-card-title>Top 10 Australian beaches</v-card-title>
      </v-img>

      <v-card-subtitle class="pb-0">Number 10</v-card-subtitle>

      <v-card-text class="text--primary">
        <div>Whitehaven Beach</div>

        <div>Whitsunday Island, Whitsunday Islands</div>
      </v-card-text>

      <v-card-actions>
        <v-btn color="orange" text>
          Share
        </v-btn>

        <v-btn color="orange" text>
          Explore
        </v-btn>
      </v-card-actions>
    </v-card>
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
