<template>
  <main-layout>
    <div class="bg-light mt-3 py-2 rounded">
      <div class="d-flex align-items-center justify-content-between p-3">
      <h4 class="text-center py-2">Let's play with vue !</h4>
      <button :class="addPostModal ? 'btn-danger' : 'btn-primary'" class="btn" @click="addPostModal = !addPostModal">{{ addPostModal ? 'Cancel' : 'Add Post' }}</button>
      </div>
      <div v-if="addPostModal" class="col-md-6 mx-auto bg-white px-3 py-2 rounded mb-3">
        <div v-if="hasErrors">
          <ul v-for="err in this.errors" :key="err.id">
            <li class="text-danger">{{ err }}</li>
          </ul>
        </div>
        <form @submit.prevent="addPost()">
          <div class="mb-3">
            <label for="title" class="form-label">Title : </label>
            <input
              v-model.trim="title"
              type="text"
              id="title"
              class="form-control"
              placeholder="Enter title"
              autocomplete="off"
            />
          </div>
          <div class="mb-3">
            <label for="description" class="form-label">Description : </label>
            <textarea
              v-model.trim="description"
              id="description"
              class="form-control"
              placeholder="Description geos here."
            ></textarea>
          </div>
          <div class="mb-3">
            <label for="time" class="form-label">Time : </label>
            <input
              v-model="this.currentDate"
              type="date"
              id="time"
              class="form-control"
            />
          </div>
          <div class="text-center">
            <button class="col-12 btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
      <div v-for="post in posts" :key="post.id" class="px-3 mb-2">
        <div class="bg-white p-2">
          <div class="d-flex align-items-center justify-content-between">
            <div>
              <div class="d-flex align-items-center gap-3">
                <h4>{{ post.title }}</h4>
                <span class="text-secondary">{{ post.date }}</span>
              </div>
              <p>{{ post.description }}</p>
            </div>
            <div class="d-flex align-items-center gap-1">
              <button class="btn btn-primary">View</button>
              <button class="btn btn-danger" @click="deletePost(post.id)">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main-layout>
</template>

<script>
import MainLayout from "@/layouts/MainLayout.vue";
import axios from "axios";
export default {
  components: { MainLayout },
  name: "Post",
  data() {
    return {
      currentDate: this.getCurrentDate(),
      user_id: "",
      title: "",
      date: "",
      description: "",
      posts: [],
      errors: [],
      users: [],
      addPostModal: false,
    };
  },
  mounted() {
    this.getPosts();
    this.getAuth();
  },
  computed: {
    hasErrors() {
      return this.errors.length > 0;
    },
  },
  methods: {
    getAuth() {
      const auth = localStorage.getItem("auth");
      const user = JSON.parse(auth);
      this.user_id = user.id;
    },
    async getPosts() {
      const response = await axios.get("http://localhost:3001/posts");
      this.posts = response.data;
    },
    getCurrentDate() {
      const now = new Date();
      const formattedDate = now.toISOString().slice(0, 10);
      return formattedDate;
    },
    async addPost() {
      this.validateForm();
      if (!this.hasErrors) {
        try {
          const response = await axios.post("http://localhost:3001/posts", {
            title: this.title,
            user_id: this.user_id,
            description: this.description,
            date: this.currentDate,
          });
          this.getPosts();
          this.title = "";
          this.description = "";
        } catch (err) {
          console.error("Getting error: ", err);
        }
      }
    },
    validateForm() {
      this.errors = [];
      if (!this.title.trim()) {
        this.errors.push("title must not be empty");
      }
      if (!this.description.trim()) {
        this.errors.push("description must not be empty");
      }
    },
    async deletePost(id) {
      if(confirm("Are you sure you want to delete")) {
        try{
          const response = await axios.delete(`http://localhost:3001/posts/${id}`);
          this.getPosts();
        }catch(err) {
          console.log('Error : ', err);
        }
      }

    }
  },
};
</script>

<style>
</style>