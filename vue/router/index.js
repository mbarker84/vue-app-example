import { createRouter, createWebHistory } from "vue-router";

const Home = () => import("../routes/Home.vue");
const Locations = () => import("../routes/Locations.vue");

const routes = [
  {
    name: "home",
    path: "/",
    component: Home,
  },
  {
    name: "locations",
    path: "/locations",
    component: Locations,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
