<template>
    <main-layout>
        <h1 class="text-center py-3">Welcome to vue-auth , <span class="text-danger"> {{ this.auth ? this.auth.username : null }}</span></h1>
    </main-layout>
</template>

<script>
import MainLayout from "../layouts/MainLayout.vue";
export default {
    name: "Home",
    data() {
        return {
            auth: '',
        }
    },
    mounted() {
        this.auth = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : null;
    },
    components: {
        MainLayout,
    }
}
</script>
