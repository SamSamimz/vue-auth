<template>
  <auth-layout>
    <div :class="{ loading: !ready }" class="col-md-6 mx-auto">
      <div class="bg-light px-3 py-2 rounded">
        <h4 class="text-center py-2">Login now !</h4>
        <div v-if="hasErrors">
          <ul v-for="err in this.errors" :key="err.id">
            <li class="text-danger">{{ err }}</li>
          </ul>
        </div>
        <form @submit.prevent="loginUser()">
          <div class="mb-3">
            <label for="email" class="form-label">Email : </label>
            <input
              v-model="credentials.email"
              type="text"
              id="email"
              class="form-control"
              placeholder="Enter your email address"
              autocomplete="off"
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password : </label>
            <input
              v-model="credentials.password"
              type="password"
              id="password"
              class="form-control"
              placeholder="Enter a password between 4-8"
              autocomplete="off"
            />
          </div>
          <div class="text-center">
            <button class="col-12 btn btn-primary">Login</button>
            <router-link to="register">Don't have an account?</router-link>
          </div>
        </form>
      </div>
    </div>
  </auth-layout>
</template>

<script>
import AuthLayout from "../../layouts/AuthLayout.vue";
import axios from "axios";
import bcrypt from "bcryptjs";
export default {
  name: "Login",
  components: {
    AuthLayout,
  },
  data() {
    return {
      ready: false,
      credentials: {
        email: "",
        password: "",
      },
      errors: [],
      existsEmail: [],
    };
  },
  mounted() {
    axios
      .get("http://localhost:3001/users")
      .then((response) => {
        this.existsEmail = response.data.map((user) => user.email);
      })
      .catch((error) => {
        console.error("Error fetching emails:", error);
      });
    setTimeout(() => {
      this.ready = true;
    }, 500);
  },
  methods: {
    async loginUser() {
      this.validate();
      if (!this.hasErrors) {
        try {
          const response = await axios.get("http://localhost:3001/users");
          const user = response.data.find(
            (user) => user.email == this.credentials.email
          );
          if (user) {
            if (await bcrypt.compare(this.credentials.password, user.password)) {
              localStorage.clear();
              localStorage.setItem('auth', JSON.stringify(user));
              this.$router.push('/');
            } else {
              this.errors.push("password is incorrect");
              }
            this.credentials= [];
          }
        } catch (error) {
          console.error("Error :", error);
        }
      }
    },
    validate() {
      this.errors = [];
      if (!this.existsEmail.includes(this.credentials.email)) {
        this.errors.push("You don't have an account to login");
      }
      if (!this.credentials.email.trim()) {
        this.errors.push("Please enter a email");
      }
      if (!this.credentials.password.trim()) {
        this.errors.push("Please enter a password");
      }
    },
  },
  computed: {
    hasErrors() {
      return this.errors.length > 0;
    },
  },
};
</script>

<style>
.loading {
  opacity: 0.5;
  pointer-events: none;
  cursor: pointer;
}
</style>