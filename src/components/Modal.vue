<template>
  <div class="modal">
    <div>Upload a new post</div>
    <form @submit="uploadData">
      <input type="text" @change="handleCaptionChange" :value="''" />
      <input type="file" @change="handleImageChange" :value="null" />
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Modal",
};
</script>

<style>
.modal {
  position: fixed;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  background: white;
  border: 1px solid #ccc;
}
</style>
