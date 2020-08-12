<template>
  <v-app>
    <NavBar />
    <router-view />
  </v-app>
</template>

<script>
import NavBar from "./components/NavBar";
export default {
  name: "App",
  components: {
    NavBar,
  },
  data: () => ({
    //
  }),
};
</script>

<style>
.cards-container {
  width: 100%;
}

.card {
  border: 1px solid black;
  max-width: 70%;
  margin: auto;
  margin-bottom: 4em;
}

.card-img {
  max-width: 100%;
  display: block;
  margin: auto;
}
</style>
