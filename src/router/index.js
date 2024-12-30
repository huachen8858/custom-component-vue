import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import FormSeriesPage from "../pages/FormSeries.vue";

export var routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
  },
  {
    path: "/form-series",
    name: "FormSeries",
    component: FormSeriesPage,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  base: import.meta.env.BASE_URL,
  routes: routes,
});

export default router;
