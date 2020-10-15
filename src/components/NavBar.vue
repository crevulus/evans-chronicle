<template>
  <div id="NavBar" class="NavBar">
    <div class="burger">
      test
    </div>
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
      isBurgerActive: false,
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
    toggleBurger() {
      this.isBurgerActive = !this.isBurgerActive
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
.NavBar {
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  width: 100%;
  margin: 0;
  height: 4em;
  background-color: #6154b3;
  box-shadow: 0px 1px 5px #555;
}

.burger {
  display: none;
}

.auth-btn {
  display: flex;
  align-items: center;
  margin: 0;
  cursor: pointer;
  background-color: #eeb825;
}

.auth-btn:hover {
  background-color: #d8a822;
  border: none;
  box-shadow: 2px 2px 4px #555;
}

.auth-btn:focus {
  background-color: #eeb825;
  border: none;
  box-shadow: 2px 2px 4px #555;
}

.auth-btn:active {
  box-shadow: 2px 0.5px 5px #555;
  transform: translateY(1px);
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

@media screen and (max-width:600px) {
  .burger {
    display: block;
  }

  .family-member {
    display: none;
  }
}
</style>
