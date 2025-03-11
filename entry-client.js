import { createApp } from "./main.js";
import "./style.css";

const { app, router } = createApp();

console.log("--");

router.isReady().then(() => {
    app.mount("#app");
    console.log("hydrated");
});
