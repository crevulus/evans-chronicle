<template v-slot:activator="{ on }">
  <v-dialog max-width="600px">
    <v-btn text v-on="on">New Post</v-btn>
    <v-card>
      <h2>Hi</h2>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "Modal",
};
</script>

<style></style>
