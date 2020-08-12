<template>
  <md-toolbar class="md-primary NavBar">
    <span
      v-for="member in family"
      v-bind:key="member.name"
      class="family-member"
    >
      <router-link :to="member.route">{{ member.name }}</router-link>
    </span>
  </md-toolbar>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      family: [
        {
          name: "Maria",
          route: "/Maria",
        },
        {
          name: "Paul",
          route: "/Paul",
        },
        {
          name: "Katie",
          route: "/Katie",
        },
        {
          name: "Christopher",
          route: "/Christopher",
        },
      ],
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
  text-align: center;
}
</style>
