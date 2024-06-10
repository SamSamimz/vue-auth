<template>
  <auth-layout>
    <div :class="{ loading: !ready }" class="col-md-6 mx-auto">
      <div class="bg-light px-3 py-2 rounded">
        <h4 class="text-center py-2">Register for free !</h4>
        <div v-if="hasErrors">
          <ul v-for="err in this.errors" :key="err.id">
            <li class="text-danger">{{ err }}</li>
          </ul>
        </div>
        <form @submit.prevent="registerUser()">
          <div class="mb-3">
            <label for="username" class="form-label">Username : </label>
            <input
              v-model.trim="credentials.username"
              type="text"
              id="username"
              class="form-control"
              placeholder="Enter your username"
              autocomplete="off"
            />
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email : </label>
            <input
              v-model.trim="credentials.email"
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
              v-model.trim="credentials.password"
              type="password"
              id="password"
              class="form-control"
              placeholder="Enter a password between 4-8"
              autocomplete="off"
            />
          </div>
          <div class="text-center">
            <button class="col-12 btn btn-primary">Signup</button>
            <router-link to="login">Already have an account?</router-link>
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
  name: "Register",
  components: {
    AuthLayout,
  },
  methods: {
    async registerUser() {
      const saltRounds = 10;
      const hasPassword = await bcrypt
        .hash(this.credentials.password, saltRounds)
        .then((hashPassword) => {
          this.credentials.password = hashPassword;
        });
      this.validateForm();
      if (!this.hasErrors) {
        try {
          const response = await axios.post(
            "http://localhost:3001/users",
            this.credentials
          );
          this.credentials = [];
          this.$router.push("/login");
        } catch (err) {
          console.error("Getting error: ", err);
        }
      }else {
        this.credentials.password = "";
      }
    },
    validateForm() {
      if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/.test(this.credentials.email)) {
        this.errors.push("Please enter a valid email address");
      }
      if (this.existsEmail.includes(this.credentials.email)) {
        this.errors.push(this.credentials.email + " is already in use");
      }
      if (!this.credentials.username.trim()) {
        this.errors.push("Please enter a username");
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
  data() {
    return {
      ready: false,
      credentials: {
        username: "",
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
};
</script>

<style>
.loading {
  opacity: 0.5;
  pointer-events: none;
  cursor: pointer;
}
</style>