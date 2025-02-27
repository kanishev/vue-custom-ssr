import { renderToString } from "vue/server-renderer";
import { createApp } from "./main.js";

export async function render(url, manifest) {
    console.log(url, manifest);

    const { app, router } = createApp();

    await router.push(url);
    await router.isReady();

    const ctx = {};
    const html = await renderToString(app, ctx);
    return [html];
}
