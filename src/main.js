import { createApp } from "vue";
import { firestorePlugin } from "vuefire";

import App from "./App.vue";

import "./assets/main.css";

const app = createApp(App);

app.mount("#app");
