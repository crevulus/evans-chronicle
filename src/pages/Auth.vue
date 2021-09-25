<template>
  <div class="auth-container">
    <h1>Evans Login</h1>
    <p>
      <strong>Forgot your password?</strong> Text me, I guess. This ain't
      Google.
    </p>
    <div v-if="error" class="error">{{ error }}</div>
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
      <button type="submit" class="submit">Login</button>
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

<style>
.auth-container {
  padding: 10px;
}

.error {
  color: red;
}

.submit {
  box-shadow: 2px 2px 5px #555;
}

.submit:active {
  box-shadow: 2px 0.5px 5px #555;
  transform: translateY(2px);
}

@media screen and (max-width: 400px) {
  .submit {
    display: block;
    margin: 1rem 0;
  }
}
</style>
