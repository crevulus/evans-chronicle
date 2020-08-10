import Vue from "vue";
import Router from "vue-router";
import Home from "./pages/Home";
import Maria from "./pages/Maria";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/Maria",
      name: "Maria",
      component: Maria,
    },
  ],
});
