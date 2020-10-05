<template>
  <div>
    <Modal v-if="modalOpen" @close-modal="toggleModal" />
    <div :class="{ 'modal-overlay': modalOpen }">
      <div class="heading">
        <h2 class="title">Maria's Posts</h2>
        <button
          v-if="user.loggedIn"
          @click="newPostButton"
          class="new-post-btn"
        >
          New Post
        </button>
      </div>
      <form v-if="newPostOpen" @submit="uploadData" class="new-post-container">
        <input
          type="text"
          @change="handleCaptionChange"
          :value="''"
          placeholder="Type your caption here..."
          class="new-post-text-input"
        />
        <input type="file" @change="handleImageChange" :value="null" />
        <button type="submit">Submit</button>
      </form>
      <div v-if="this.dataLoaded">
        <Cards :imageData="picturesData" @delete-post="deleteImage" />
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

export default {
  name: "Maria",
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
    };
  },
  created() {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        this.location = pos;
      },
      (err) => {
        console.log(err.message);
      }
    );
  },
  mounted() {
    this.renderImages("Maria");
    this.refreshImages();
  },
  methods: {
    newPostButton() {
      if (this.user.loggedIn === false) {
        this.toggleModal();
      } else {
        this.toggleNewPost();
      }
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
      event.preventDefault();
      let file = this.uploadFile;
      const storageRef = fb.storage().ref("Maria/" + file.name);
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
            db.collection("Maria")
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
            this.uploadFile = null;
            this.uploadCaption = null;
          });
        }
      );
    },
    async renderImages(collection) {
      await getFamilyImages(collection).then(
        (data) => (this.picturesData = data)
      );
      this.dataLoaded = true;
    },
    refreshImages() {
      db.collection("Maria") // replacing this with name param seems to break it
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
.modal-overlay {
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  -webkit-filter: blur(4px); /* Chrome, Safari, Opera */
  filter: blur(4px);
}

.heading {
  display: grid;
  grid-template-columns: 80% 20%;
  align-items: center;
  margin: 0 10px;
}

.new-post-btn {
  float: right;
  background-color: #b03634;
  max-height: 3rem;
  color: white;
}

.new-post-btn:hover {
  background-color: #a33432;
  text-decoration: none;
  border: none;
  box-shadow: 1px 1px 4px #999;
}

.new-post-btn:focus {
  background-color: #b03634;
  border: none;
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
</style>
