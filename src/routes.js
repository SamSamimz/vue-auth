import { createRouter, createWebHistory } from "vue-router";
import Home from '../src/components/Home.vue'
import Post from '../src/components/Post.vue'
import Login from '../src/components/auth/Login.vue'
import Register from '../src/components/auth/Register.vue'
const routes = [
    {
        name: 'Home',
        path:'/',
        alias: '/home',
        component: Home, 
    },
    {
        name: 'Posts',
        path:'/posts',
        component: Post, 
        beforeEnter: (to, from, next) => {
            if (isAuth()) {
              next();
            } else {
              next('/login');
            }
          },
    },
    {
        name: 'Login',
        path: '/login',
        component: Login,
        beforeEnter: (to, from, next) => {
            if (isAuth()) {
                next('/');
                } else {
                next();
            }
        },
    },
    {
        name: 'Register',
        path: '/register',
        component: Register,
        beforeEnter: (to, from, next) => {
            if (isAuth()) {
                next('/');
                } else {
                next();
            }
        },
    },
];

function isAuth() {
    return localStorage.getItem('auth') !== null;
  }

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;