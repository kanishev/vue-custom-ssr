import { createApp } from "./main.js";
import "./style.css";

const { app, router, pinia } = createApp();

router.isReady().then(() => {
    if (window.__pinia) {
        pinia.state.value = window.__pinia;
    }

    app.mount("#app");
    console.log("hydrated");
});
