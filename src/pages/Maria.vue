<template>
  <div>
    <h2 class="title">Maria</h2>
    <form @submit="uploadData">
      <input type="text" onfocus="this.value=''" @change="handleCaptionChange" />
      <input type="file" @change="handleImageChange" />
      <button type="submit">Submit</button>
    </form>
    <div v-if="this.dataLoaded" class="cards-container">
      <Cards v-bind:imageData="picturesData" />
    </div>
    <h4 v-else>Loading...</h4>
  </div>
</template>
<script>
import { db, fb, Timestamp, GeoPoint, getFamilyImages } from "../db";
import Cards from "../components/Cards";

export default {
  name: "Maria",
  components: {
    Cards,
  },
  data() {
    return {
      uploadCaption: "",
      uploadFile: null,
      dataLoaded: false,
      picturesData: [],
    };
  },
  mounted() {
    this.renderImages("Maria");
    this.refreshImages();
  },
  methods: {
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
                location: new GeoPoint(52.3667, 4.8945),
              });
          });
        }
      );
      this.uploadFile = null;
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
</style>
