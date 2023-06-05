import { createApp } from "vue";
import App from "./App.vue";
import "./styles/index.css";
import { createPinia } from "pinia";
import VueDragscroll from "vue-dragscroll";

const pinia = createPinia();

const app = createApp(App);
app.use(pinia);
app.use(VueDragscroll);
app.mount("#app");
