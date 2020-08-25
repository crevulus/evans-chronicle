<template>
  <div>
    <h2 class="title">Maria</h2>
    <form @submit="uploadImage">
      <input type="file" @change="handleImageChange" />
      <button type="submit">Submit</button>
    </form>
    <Cards v-bind:imageData="images" />
  </div>
</template>
<script>
import { db, fb } from "../db";
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
      file: null,
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
    handleImageChange(event) {
      this.file = event.target.files[0];
    },
    uploadImage(event) {
      event.preventDefault();
      let file = this.file;
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
            db.collection("Maria").doc().set({
              caption: "Test caption .set",
              location: null,
              source: downloadURL,
              timestamp: Date.now(),
            });
          });
        }
      );
      this.file = null;
    },
  },
};
</script>
<style>
</style>
