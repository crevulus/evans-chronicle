<template>
  <div id="NavBar" class="NavBar">
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
    <button v-if="user.loggedIn" class="auth-btn">
      <a @click.prevent="signOut" class="auth-btn-text">Sign out</a>
    </button>
    <button v-else class="auth-btn">
      <router-link class="auth-btn-text" to="/auth">Sign in</router-link>
    </button>
  </div>
</template>

<script>
import firebase from "firebase";
import { mapGetters } from "vuex";

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
  computed: {
    // store getters from store.js to local computed properties
    ...mapGetters({
      user: "user",
    }),
  },
};
</script>

<style>
button {
  border: none;
}

.auth-btn {
  display: flex;
  align-items: center;
  margin: 0;
  cursor: pointer;
  background-color: #eeb825;
  max-height: 50%;
}

.auth-btn:hover {
  background-color: #d8a822;
  border: none;
  box-shadow: 5px 3px 4px #555;
}

.auth-btn:focus {
  background-color: #eeb825;
  border: none;
  box-shadow: 5px 3px 4px #555;
}

.auth-btn-text {
  color: white;
  font-size: 14px;
}

.auth-btn-text:hover {
  text-decoration: none !important;
  color: white;
}

.auth-btn-text:focus {
  text-decoration: none !important;
  color: white;
}

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
  text-decoration: none !important;
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
