import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      loggedIn: false,
      data: null,
      locationAllowed: false,
    },
    isMobileNavOpen: true,
  },
  // getters access data stored in state
  getters: {
    user(state) {
      return state.user;
    },
    nav(state) {
      return state.isMobileNavOpen;
    },
  },
  // mutations alter data stored in state
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    },
    SET_LOCATION_PERMISSION(state) {
      state.user.locationAllowed = true;
    },
    TOGGLE_MOBILE_NAV(state) {
      state.isMobileNavOpen = !state.isMobileNavOpen;
    },
  },
  // actions trigger mutations
  actions: {
    fetchUser({ commit }, user) {
      commit("SET_LOGGED_IN", user !== null);
      if (user) {
        commit("SET_USER", {
          displayName: user.displayName,
          email: user.email,
        });
      } else {
        commit("SET_USER", null);
      }
    },
    allowLocationTracking({ commit }) {
      commit("SET_LOCATION_PERMISSION");
    },
    toggleNav({ commit }) {
      commit("TOGGLE_MOBILE_NAV");
    },
  },
});

// reference article: https://blog.logrocket.com/vue-firebase-authentication/
