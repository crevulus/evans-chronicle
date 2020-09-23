<template>
  <div id="NavBar" class="NavBar">
    <a @click.prevent="signOut">Sign out</a>
    <router-link to="/" exact>
      <img src="../assets/evans.png" class="crest" />
    </router-link>

    <span
      v-for="member in family"
      v-bind:key="member.name"
      class="family-member"
    >
      <router-link :to="member.route" class="link-text">
        {{ member.name }}
      </router-link>
    </span>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "NavBar",
  data() {
    return {
      documents: [],
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
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({
            name: "home",
          });
        });
    },
  },
};
</script>

<style>
.NavBar {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
  width: 100%;
  margin: 0;
  height: 4em;
  background-color: #6154b3;
  text-align: center;
}

.link-text {
  color: white;
  font-size: 1.3em;
}

.link-text:hover {
  text-decoration: none;
  color: #e2c269;
}

.link-text.router-link-active {
  text-decoration: none;
  text-shadow: 1px 1px #555;
  color: #eeb825;
}

.crest {
  max-height: 4em;
  max-width: 90%;
  margin: auto;
  float: left;
}
</style>
