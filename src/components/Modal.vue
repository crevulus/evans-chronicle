<template>
  <div class="modal">
    <h2>Hol' up!</h2>
    <h4>Are you an Evans?</h4>
    <div>If not: <button v-on:click="$emit('close-modal')">Back</button></div>
    <div>
      If so: Why aren'y you logged in yet?
      <router-link to="/auth"
        ><button>
          Log in
        </button></router-link
      >
    </div>
    <button v-on:click="$emit('close-modal')">Close</button>
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
