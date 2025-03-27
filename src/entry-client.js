import { createApp } from "./main.js";
import { getContext } from "./utils/context.js";
import "./style.css";

const { app, router } = createApp();

const context = getContext();
app.config.initialState = context.initialState;

await router.isReady();

app.mount("#app");
console.log("hydrated");
