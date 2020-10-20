<template>
  <div class="side-panel">
    <div class="side-panel-backdrop" @click.prevent="toggleSidePanel" v-if="isMobileNavOpen">
      
    </div>
    <transition name="slide">
      <div v-if="isMobileNavOpen" class="side-panel-container">
        <div @click.prevent="toggleSidePanel">Close</div>
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import store from "../store"

export default {
  methods: {
    toggleSidePanel() {
      store.dispatch("toggleNav")
    }
  },
  computed: {
    // store getters from store.js to local computed properties
    ...mapGetters({
      isMobileNavOpen: "nav",
    }),
  },
}
</script>

<style>
.slide-enter-active {
    transition: transform 0.2s ease;
}

.slide-enter {
    transform: translateX(-100%);
    transition: all 150ms ease-in 0s
}

.side-panel-backdrop {
    background-color: rgba(0,0,0,.5);
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    cursor: pointer;
}

.side-panel-container {
    overflow-y: auto;
    background-color: #130f4000;
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    z-index: 999;
    padding: 3rem 20px 2rem 20px;
    width: 300px;
}
</style>