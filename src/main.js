import { createSSRApp } from "vue";
import { createAppRouter } from "./router";
import App from "./App.vue";

export function createApp() {
    const app = createSSRApp(App);
    const router = createAppRouter();

    app.use(router);
    return { app, router };
}
