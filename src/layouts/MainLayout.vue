<template>
    <Navbar />
    <div class="container">
      <slot></slot>
    </div>
</template>

<script>
import Navbar from "../components/partials/Navbar.vue";
export default {
    name: "MainLayout",
    components: {
      Navbar,
    }
}
</script>

<style>
</style>