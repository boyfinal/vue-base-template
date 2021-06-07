import { createApp } from "vue";
import { setupRouter } from "./routes";
import App from "./App.vue";

const app = createApp(App);

setupRouter(app);

app.mount("#app");
