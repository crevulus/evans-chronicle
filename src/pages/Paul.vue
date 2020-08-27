<template>
  <div>
    <h2 class="title">Paul</h2>
    <form @submit="uploadData">
      <input type="text" @change="handleCaptionChange" />
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
import { db, fb, Timestamp, GeoPoint } from "../db";
import Cards from "../components/Cards";

export default {
  name: "Paul",
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
    this.getImages();
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
      const storageRef = fb.storage().ref("Paul/" + file.name);
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
            db.collection("Paul")
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
    async getImages() {
      // instead of using promises/thens
      let snapshot = await db
        .collection("Paul")
        .orderBy("timestamp", "desc")
        .get();
      snapshot.forEach((doc) => {
        let appData = doc.data();
        appData.id = doc.id;
        this.picturesData.push(appData);
      });
      this.dataLoaded = true;
    },
  },
};
</script>
<style>
</style>

