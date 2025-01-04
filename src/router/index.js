import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import FormSeriesPage from "../pages/FormSeries.vue";
import CustomTablePage from "../pages/CustomTablePage.vue";

export const routes = [
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
  {
    path: "/custom-table",
    name: "CustomTablePage",
    component: CustomTablePage,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  base: import.meta.env.BASE_URL,
  routes: routes,
});

export default router;
