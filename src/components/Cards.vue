<template>
  <div v-bind:class="{ 'cards-container-not-home': notHome }">
    <div v-for="data in imageData" :key="data.id">
      <div class="card">
        <img :src="data.source" :alt="data.caption" class="card-img" />
        <div class="text-container">
          <div class="icon-and-text">
            <p>
              <md-icon class="card-icon">calendar_today</md-icon
              >{{ moment(data.timestamp.toDate()).format("MMM Do YYYY") }}
            </p>
            <button
              v-show="user.loggedIn === userEmail && notHome"
              class="delete-btn"
              @click="toggleDelete"
            >
              <md-icon>delete_forever</md-icon>
            </button>
          </div>

          <div>
            <p>
              <md-icon class="card-icon">speaker_notes</md-icon
              >{{ data.caption }}
            </p>
          </div>
          <Geolocation v-if="data.location" v-bind:address="data.location" />
          <div v-show="showDeleteWarning" class="delete-warning">
            <p>Are you sure you want to delete this post?</p>
            <button
              @click="
                $emit('delete-post', data.id);
                toggleDelete();
              "
              class="submit"
            >
              Yes</button
            ><button @click="toggleDelete" class="submit">No</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import axios from "axios";
import Geolocation from "./Geolocation";
import { mapGetters } from "vuex";

export default {
  name: "Cards",
  components: {
    Geolocation,
  },
  props: {
    imageData: {
      type: Array,
    },
    deleteImage: {
      type: Function,
    },
    userEmail: {
      type: String,
    },
  },
  data() {
    return {
      loaded: false,
      imageAnnotations: "",
      showDeleteWarning: false,
    };
  },
  methods: {
    toggleDelete() {
      this.showDeleteWarning = !this.showDeleteWarning;
    },
  },
  computed: {
    notHome() {
      return this.$route.path !== "/";
    },
    ...mapGetters({
      user: "user",
    }),
  },
};
</script>
<style>
.card {
  max-width: 90%;
  margin: auto;
  margin-bottom: 4em;
  border: 1px solid #555;
  border-radius: 5px;
  box-shadow: 1px 1px 4px #555;
}

.card-img {
  max-width: 100%;
  display: block;
  margin: auto;
}

.text-container {
  margin: 1em;
}

.card-icon {
  color: #b03634;
  margin-right: 3px !important;
}

.icon-and-text {
  margin: auto;
}

.delete-btn {
  background-color: #b03634;
  float: right;
  align-self: center;
  max-height: 2rem;
  padding: 2px;
}

.delete-btn:hover {
  background-color: #a33432;
  text-decoration: none;
  border: none;
  box-shadow: 1px 1px 4px #999;
}

.delete-btn:focus {
  background-color: #b03634;
  border: none;
}

.delete-btn:active {
  box-shadow: 2px 0.5px 5px #555;
  transform: translateY(1px);
}

.delete-warning {
  float: right;
  position: absolute;
  z-index: 10 !important;
  background-color: rgb(202, 200, 200);
  margin: 5px 10px 20px 10px;
  padding: 5px;
  border: 1px solid #999;
  border-radius: 5px;
}

@media screen and (min-width: 1000px) {
  .cards-container-not-home {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}

@media screen and (min-width: 1350px) {
  .cards-container-not-home {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}
</style>
