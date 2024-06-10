<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container">
    <router-link to="/" class="navbar-brand">Vue Auth</router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link to="/home" :class="{ 'active': $route.name === 'Home' }" class="nav-link">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/posts" class="nav-link">Posts</router-link>
        </li>
      </ul>
      <div v-if="this.auth">
      <button @click="logoutUser()" class="col-12 btn btn-danger d-sm-none">Logout</button>
      <button @click="logoutUser()" class="btn btn-danger d-none d-sm-inline">Logout</button>
      </div>
      <div v-else class="navbar-nav">
        <router-link to="/login" class="nav-link">Login</router-link>
        <router-link to="/register" class="nav-link">Register</router-link>
      </div>

      </div>
  </div>
</nav>
</template>

<script>
export default {
    name: 'Navbar',
    data() {
      return {
        auth: '',
      }
    },
    mounted() {
      this.auth = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : null;
    },
    methods: {
      logoutUser() {
      if(confirm("Are you sure you want to log out?")) {
          localStorage.clear();
          this.$router.push('/login');
        }
      }
    }
}
</script>
