<template>
  <div>
    <div v-for="data in imageData" :key="data.id">
      <div class="card">
        <img :src="data.source" :alt="data.caption" class="card-img" />
        <div class="text-box">
          <p>{{ moment(data.timestamp.toDate()).format("MMM Do YYYY") }}</p>
          <p>{{ data.caption }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Cards",
  props: {
    imageData: {
      type: Array,
    },
  },
};
</script>
<style></style>
