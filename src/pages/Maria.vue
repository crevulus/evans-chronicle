<template>
  <div>
    <h2 class="title">Maria</h2>
    <input type="file" @change="uploadImage" />
    <Cards v-bind:imageData="images" />
  </div>
</template>
<script>
import { fb } from "../db";
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
    uploadImage(event) {
      let file = event.target.files[0];
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
            this.images.push({
              source: downloadURL,
              caption: "test caption",
              timestamp: 1598357494247,
            });
            console.log("File available at ", downloadURL);
          });
        }
      );
    },
  },
};
</script>
<style>
</style>
