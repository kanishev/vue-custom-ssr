import { renderToString } from "vue/server-renderer";
import { createApp } from "./main.js";
import { renderPreloadLinks, formSSRInstanceProperties } from "./utils/ssr.ts";

export async function render(url, manifest) {
    const { app, router, pinia } = createApp();

    formSSRInstanceProperties(app);

    await router.push(url);
    await router.isReady();

    const ctx = { pinia, router };
    const html = await renderToString(app, ctx);

    const initialState = JSON.stringify(app.config.initialState);
    const globalState = JSON.stringify(app.config.globalState);
    const piniaState = JSON.stringify(pinia.state.value);

    const preloadLinks = renderPreloadLinks(ctx.modules, manifest);

    return { html, initialState, piniaState, globalState, preloadLinks };
}
