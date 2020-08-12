<template>
  <div id="NavBar" class="NavBar">
    <span
      v-for="member in family"
      v-bind:key="member.name"
      class="family-member"
    >
      <router-link :to="member.route" class="link-text">{{
        member.name
      }}</router-link>
    </span>
  </div>
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
  background-color: purple;
  text-align: center;
}

.link-text {
  color: white;
}
</style>
