<template>
  <div>
    <h2 class="title">Maria</h2>
    <form @submit="uploadData">
      <input type="text" @change="handleCaptionChange" />
      <input type="file" @change="handleImageChange" />
      <button type="submit">Submit</button>
    </form>
    <Cards v-bind:imageData="images" />
  </div>
</template>
<script>
import { db, fb, Timestamp, GeoPoint } from "../db";
import arrow from "../assets/arrow.jpg";
import big_door from "../assets/big_door.jpg";
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
      images: [
        {
          source: arrow,
          caption: "This is a test caption for the arrow picture",
          timestamp: 1597216974189,
        },
        {
          source: big_door,
          caption: "This is a test caption for the big door picture",
          timestamp: 1597231561906,
        },
      ],
    };
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
  },
};
</script>
<style>
</style>
