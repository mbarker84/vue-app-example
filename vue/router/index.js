import { createRouter, createWebHistory } from "vue-router";

const Home = () => import("../routes/Home.vue");
const About = () => import("../routes/About.vue");

const routes = [
  {
    name: "home",
    path: "/",
    component: Home,
  },
  {
    name: "about",
    path: "/about",
    component: About,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
