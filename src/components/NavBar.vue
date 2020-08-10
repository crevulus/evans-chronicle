<template>
  <div id="NavBar" class="NavBar">
    <router-link to="/Maria">Maria</router-link>
    <!-- <span v-for="member in family" v-bind:key="member" class="family-member">{{
      member
    }}</span> -->
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      family: ["Maria", "Paul", "Katie", "Christopher"],
    };
  },
};
</script>

<style>
.NavBar {
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  margin: 0;
  background: black;
  color: white;
  text-align: center;
}
</style>
