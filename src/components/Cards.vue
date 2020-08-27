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
<style>
.card {
  max-width: 70%;
  margin: auto;
  margin-bottom: 4em;
  border: 1px solid #555;
  border-radius: 5px;
  box-shadow: 1px 1px 4px #555;
}

.text-box {
  margin: 1em;
}

.card-img {
  max-width: 100%;
  display: block;
  margin: auto;
}
</style>
