<template>
  <div>
    <Modal v-if="modalOpen" @close-modal="toggleModal" />
    <div :class="{ 'modal-overlay': modalOpen }">
      <h2 class="title">Maria</h2>
      <button @click="newPostButton" class="new-post">New Post</button>
      <form v-if="newPostOpen" @submit="uploadData">
        <input type="text" @change="handleCaptionChange" :value="''" />
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
      dataLoaded: false,
      picturesData: [],
      location: "",
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

.new-post {
  background-color: #b03634;
  color: white;
}

.new-post:hover {
  background-color: #b03634;
  text-decoration: none;
  border: none;
  box-shadow: 1px 1px 4px #999;
}
</style>
