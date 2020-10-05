<template>
  <div>
    <h3>Evans Login</h3>
    <p>Forgot your password? Text me, I guess. This ain't facebook.</p>
    <div v-if="error">{{ error }}</div>
    <!-- prevent default refresh -->
    <form action="#" @submit.prevent="submit">
      <label for="email">Email</label>
      <input
        id="email"
        type="email"
        name="email"
        value
        required
        autofocus
        v-model="form.email"
      />
      <label for="password">Password</label>
      <input
        id="password"
        type="password"
        name="password"
        required
        v-model="form.password"
      />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      error: null,
    };
  },
  methods: {
    submit() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(() => {
          this.$router.replace({ name: "home" });
        })
        .catch((err) => {
          this.error = err.message;
        });
    },
  },
};
</script>

<style></style>
