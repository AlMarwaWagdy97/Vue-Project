import { createRouter, createWebHistory } from "vue-router";
import store from "../store/index";
const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import( "../views/Home.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import( "../views/About.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import( "../views/Login.vue"),
    meta: {
      guest : true
    }
  },
  {
    path: "/register",
    name: "Register",
    component: () => import( "../views/Register.vue"),
    meta: {
      guest : true
    }
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import( "../views/Profile.vue"),
    meta: {
      requiresAuth: true 
    }
  },
  
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to,from,next) => {

  if(to.matched.some(record => record.meta.requiresAuth)){
    if(!(store.state.logedIn)){
      // console.log("go login");
      next({
        path: '/login',
      })
    }
    else{
      // console.log("Already login");
      next()
    }
  }
  else if(to.matched.some(record => record.meta.guest)){
    if(!(store.state.logedIn)){
      // console.log("no require login");
      next();
    }
    else{
      // console.log("after login");
      next({
        path: '/profile',
      });
    }
  }  
  else{
    next();
  }
});

export default router;
