import Vue from "vue";
import Router from "vue-router";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Maria from "./pages/Maria";
import Paul from "./pages/Paul";
import Katie from "./pages/Katie";
import Christopher from "./pages/Christopher";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/auth",
      name: "auth",
      component: Auth,
    },
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
    {
      path: "/Paul",
      name: "Paul",
      component: Paul,
    },
    {
      path: "/Katie",
      name: "Katie",
      component: Katie,
    },
    {
      path: "/Christopher",
      name: "Christopher",
      component: Christopher,
    },
  ],
});
