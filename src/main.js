import { createSSRApp } from "vue";
import { createAppRouter } from "./router";
import { createPinia } from "pinia";
import App from "./App.vue";

export function createApp() {
    const app = createSSRApp(App);
    const router = createAppRouter();
    const pinia = createPinia();

    app.use(pinia);
    app.use(router);

    return { app, router };
}
