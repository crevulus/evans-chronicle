<template>
  <div id="app" role="main">
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

body {
  background-color: #f1f1f1;
}
</style>
