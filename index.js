import { createApp } from "vue";
import router from "./vue/router";
import App from "./vue/App.vue";

const app = createApp(App);
app.use(router).mount("#app");
