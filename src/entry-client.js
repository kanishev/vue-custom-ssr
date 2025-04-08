import { createApp } from "./main.js";
import { getContext } from "./utils/context.js";
import "./style.css";

const { app, router, pinia } = createApp();

const context = getContext();
app.config.initialState = context.initialState;
app.config.globalState = context.globalState;
pinia.state.value = context.piniaState;

await router.isReady();

app.mount("#app");
console.log("hydrated");
