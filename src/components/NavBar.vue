<template>
  <div id="NavBar" class="NavBar">
    <router-link to="/" exact>
      <img src="../assets/evans.png" class="crest" />
    </router-link>

    <span v-for="member in family" v-bind:key="member.name" class="family-member">
      <router-link :to="member.route" class="link-text">
        {{
        member.name
        }}
      </router-link>
    </span>
  </div>
</template>

<script>
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
  // methods: {
  //   hideShowNav: function () {
  //     let prevScrollpos = window.pageYOffset;
  //     window.onscroll = function () {
  //       let currentScrollPos = window.pageYOffset;
  //       if (prevScrollpos > currentScrollPos) {
  //         document.getElementById("NavBar").classList.add("NavBar");
  //         document.getElementById("NavBar").classList.remove("NavBar-hidden");
  //       } else {
  //         document.getElementById("NavBar").classList.add("NavBar-hidden");
  //         document.getElementById("NavBar").classList.remove("NavBar");
  //       }
  //       prevScrollpos = currentScrollPos;
  //     };
  //   },
  // },
};
</script>

<style>
/* .NavBar {
  display: flex;
  position: fixed;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
  height: 4em;
  width: 100%;
  margin-top: -6em;
  background-color: #7d36f0;
}

.NavBar-hidden {
  display: none;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
  height: 4em;
  width: 100%;
  margin: 0;
  background-color: #7d36f0;
} */

.NavBar {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
  width: 100%;
  margin: 0;
  height: 4em;
  background-color: #7d36f0;
  text-align: center;
}

.link-text {
  color: white;
  font-size: 1.3em;
}

.link-text:hover {
  text-decoration: none;
  color: #b1a8b9;
}

.link-text.router-link-active {
  text-decoration: none;
  color: #3abeaa;
}

.crest {
  max-height: 4em;
  max-width: 90%;
  margin: auto;
  float: left;
}
</style>
