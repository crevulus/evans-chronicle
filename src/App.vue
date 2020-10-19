<template>
  <div id="app">
    <NavBar />
    <router-view class="content" />
  </div>
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
button {
  border: none;
}
</style>
