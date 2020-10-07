<template>
  <div>
    <p>Are you sure you want to delete this post?</p>
    <button
      @click="
        $emit('delete-post', data.id);
        toggleDelete();
      "
      class="submit"
    >
      Yes</button
    ><button @click="toggleDelete" class="submit">No</button>
  </div>
</template>

<script>
export default {
  name: "DeleteWarning",
  props: {
    data: {
      type: Object,
    },
  },
};
</script>

<style></style>
