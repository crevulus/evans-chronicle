<template>
  <div id="NavBar" class="NavBar">
    <SidePanel v-show="isMobileNavOpen" :family="family"/>
    <div class="side-panel-button div-button" @click.prevent="toggleSidePanel">
      Menu
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
import store from "../store"

import SidePanel from './SidePanel'

export default {
  name: "NavBar",
  components: {
    SidePanel,
  },
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
    toggleSidePanel() {
      store.dispatch("toggleNav")
    }
  },
  computed: {
    // store getters from store.js to local computed properties
    ...mapGetters({
      user: "user",
      isMobileNavOpen: "nav"
    }),
  },
};
</script>

<style>
.NavBar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  width: 100%;
  margin: 0;
  padding: 0.3rem 5rem;
  height: 4em;
  background-color: #6154b3;
  box-shadow: 0px 1px 5px #555;
}

.div-button {
  cursor: pointer;
}

.side-panel-button {
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

@media screen and (max-width:800px) {
  .NavBar {
    padding: 0.3rem 2rem;
  }
}

@media screen and (max-width:600px) {
  .NavBar {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;
    padding: 0.3rem 1rem;
  }
  
  .side-panel-button {
    grid-column-start: 1;
    display: block;
    color: white;
    text-shadow: 1px 1px #555;
    font-size: 18px;
  }

  .crest {
    grid-column-start: 2;
  }

  .auth-btn {
    grid-column-start: 3;
    margin: 0;
    padding: 0.5rem 1rem;
    cursor: pointer;
    background-color: #eeb825;
  }

  .family-member {
    display: none;
  }
}
</style>
