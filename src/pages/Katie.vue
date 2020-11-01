<template>
  <div>
    <Modal v-show="modalOpen" @close-modal="toggleModal" />
    <div :class="{ 'modal-overlay': modalOpen }">
      <div class="heading">
        <h2 class="title">Katie's Posts</h2>
        <button
          v-show="user.loggedIn && user.data.email === userEmail"
          @click="newPostButton"
          class="new-post-btn"
        >
          New Post<md-icon v-if="!newPostOpen" class="icon">expand_more</md-icon
          ><md-icon v-else class="icon">expand_less</md-icon>
        </button>
      </div>
      <form
        v-show="newPostOpen"
        @submit="uploadData"
        class="new-post-container"
      >
        <input
          type="text"
          @change="handleCaptionChange"
          :value="''"
          placeholder="Type your caption here..."
          class="new-post-text-input"
        />
        <input
          type="file"
          @change="handleImageChange"
          :value="null"
          class="choose-file"
        />
        <button v-if="submitting" disabled>
          <md-icon class="loading">hourglass_empty</md-icon>
        </button>
        <button v-else type="submit" class="submit">
          Submit
        </button>
      </form>
      <div v-if="this.dataLoaded">
        <Cards
          :imageData="picturesData"
          @delete-post="deleteImage"
          :userEmail="userEmail"
        />
      </div>
      <h4 v-else>Loading...</h4>
    </div>
  </div>
</template>
<script>
import {
  db,
  fb,
  Timestamp,
  GeoPoint,
  getFamilyImages,
  deletePost,
} from "../db";
import { mapGetters } from "vuex";
import Cards from "../components/Cards";
import Modal from "../components/Modal";

import store from "../store";

export default {
  name: "Katie",
  components: {
    Cards,
    Modal,
  },
  data() {
    return {
      uploadCaption: "",
      uploadFile: null,
      picturesData: [],
      location: "",
      dataLoaded: false,
      newPostOpen: false,
      modalOpen: false,
      submitting: false,
      first: false,
      userEmail: "katieevans91@hotmail.com",
    };
  },
  created() {},
  mounted() {
    this.renderImages("Katie");
    this.refreshImages();
  },
  methods: {
    newPostButton() {
      this.toggleNewPost();
      navigator.permissions.query({ name: "geolocation" }).then((status) => {
        if (status.state === "granted") {
          store.dispatch("allowLocationTracking");
        }
      });
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          this.location = pos;
        },
        (err) => {
          console.log(err.message);
        }
      );
    },
    toggleNewPost() {
      this.newPostOpen = !this.newPostOpen;
    },
    toggleModal() {
      this.modalOpen = !this.modalOpen;
    },
    handleCaptionChange(event) {
      this.uploadCaption = event.target.value;
    },
    handleImageChange(event) {
      this.uploadFile = event.target.files[0];
    },
    uploadData(event) {
      if (this.uploadCaption !== null && this.uploadFile !== null) {
        event.preventDefault();
        this.submitting = true;
        let file = this.uploadFile;
        const storageRef = fb.storage().ref("Katie/" + file.name);
        let uploadTask = storageRef.put(file);
        uploadTask.on(
          "state_changed",
          () => {},
          (error) => {
            console.error(error);
          },
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              console.log("File available at ", downloadURL);
              console.log(this.uploadCaption);
              if (this.user.locationAllowed) {
                db.collection("Katie")
                  .doc()
                  .set({
                    caption: this.uploadCaption,
                    source: downloadURL,
                    timestamp: Timestamp.now(),
                    location: new GeoPoint(
                      this.location.coords.latitude,
                      this.location.coords.longitude
                    ),
                  });
              } else {
                db.collection("Katie")
                  .doc()
                  .set({
                    caption: this.uploadCaption,
                    source: downloadURL,
                    timestamp: Timestamp.now(),
                  });
              }
              this.submitting = false;
              alert("Post submitted!");
              this.uploadFile = null;
              this.uploadCaption = null;
            });
          }
        );
      } else {
        event.preventDefault();
        alert("Please input a valid caption & image.");
      }
    },
    async renderImages(collection) {
      await getFamilyImages(collection).then(
        (data) => (this.picturesData = data)
      );
      this.dataLoaded = true;
    },
    refreshImages() {
      db.collection("Katie") // replacing this with name param seems to break it
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          let newPicturesData = [];
          snapshot.forEach((doc) => {
            let newPictureData = doc.data();
            newPictureData.id = doc.id;
            newPicturesData.push(newPictureData);
          });
          this.picturesData = newPicturesData;
        });
    },
    deleteImage(doc) {
      deletePost(this.$route.name, doc);
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
/* .modal-overlay {
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  -webkit-filter: blur(4px); -- Chrome, Safari, Opera
  filter: blur(4px);
} */

.heading {
  display: grid;
  grid-template-columns: 80% 20%;
  align-items: center;
  margin: 0 20px !important;
}

.new-post-btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
  float: right;
  background-color: #b03634;
  max-height: 3rem;
  color: white;
}

.icon {
  margin: 0 !important;
}

.new-post-btn:hover {
  background-color: #a33432;
  text-decoration: none;
  border: none;
  box-shadow: 2px 1px 4px #999;
}

.new-post-btn:focus {
  background-color: #b03634;
  border: none;
}

.new-post-btn:active {
  box-shadow: 0.5px 0.5px 4px #555;
  box-shadow: 2px 0.5px 5px #555;
  transform: translateY(1px);
}

.new-post-container {
  background-color: rgb(202, 200, 200);
  margin: 5px 10px 20px 10px;
  padding: 5px;
  border: 1px solid #999;
  border-radius: 5px;
}

.new-post-text-input {
  background-color: white;
}

.loading {
  animation: rotation 2s infinite linear;
  transform-origin: 50% 50%;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}

@media screen and (max-width: 600px) {
  .heading {
    display: grid;
    grid-template-columns: 60% 40% !important;
  }

  .new-post-btn {
    margin: 0;
    justify-content: center;
  }
}

@media screen and (max-width: 400px) {
  .choose-file {
    display: block;
    margin: 1rem 0;
  }
  .new-post-btn i {
    display: none;
  }
}
</style>
