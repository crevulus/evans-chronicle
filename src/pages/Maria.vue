<template>
  <div>
    <h2 class="title">Maria</h2>
    <Modal v-if="modalOpen" />
    <div :class="modalOpen ? 'modal-overlay' : ''">
      <button @click="toggleModal">New Post</button>
      <!-- <Modal /> -->
      <form @submit="uploadData">
        <input type="text" @change="handleCaptionChange" :value="''" />
        <input type="file" @change="handleImageChange" :value="null" />
        <button type="submit">Submit</button>
      </form>
      <div v-if="this.dataLoaded" class="cards-container">
        <Cards v-bind:imageData="picturesData" />
      </div>
      <h4 v-else>Loading...</h4>
    </div>
  </div>
</template>
<script>
import { db, fb, Timestamp, GeoPoint, getFamilyImages } from "../db";
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
      modal: false,
      uploadCaption: "",
      uploadFile: null,
      dataLoaded: false,
      picturesData: [],
      location: "",
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
    // async getImages() {
    //   // instead of using promises/thens
    //   let picturesData = [];
    //   let snapshot = await db
    //     .collection("Maria")
    //     .orderBy("timestamp", "desc")
    //     .get();
    //   snapshot.forEach((doc) => {
    //     let appData = doc.data();
    //     appData.id = doc.id;
    //     picturesData.push(appData);
    //   });
    //   this.picturesData = picturesData;
    //   this.dataLoaded = true;
    // },
    async renderImages(collection) {
      await getFamilyImages(collection).then(
        (data) => (this.picturesData = data)
      );
      this.dataLoaded = true;
    },
    refreshImages() {
      db.collection("Maria")
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
</style>
