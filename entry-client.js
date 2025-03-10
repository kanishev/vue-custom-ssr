import { createApp } from "./main.js";
import "./style.css";

const { app, router } = createApp();

router.isReady().then(() => {
    app.mount("#app");
    console.log("hydrated");
});
