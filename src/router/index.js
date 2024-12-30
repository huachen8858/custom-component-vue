import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";

export var routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  base: import.meta.env.BASE_URL,
  routes: routes,
});

export default router;
