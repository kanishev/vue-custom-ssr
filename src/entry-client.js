import { createApp } from "./main.js";
import { getContext } from "./utils/context.ts";
import { formClientInstanceProperties } from "./utils/appInstance.ts";
import "./style.css";

const { app, router, pinia } = createApp();

const context = getContext();

formClientInstanceProperties(app, context);
pinia.state.value = context.piniaState;

await router.isReady();

app.mount("#app");
console.log("hydrated");
