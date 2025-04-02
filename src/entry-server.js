import { renderToString } from "vue/server-renderer";
import { createApp } from "./main.js";
import { renderPreloadLinks, formSSRInstanceProperties } from "./ssr/utils.js";

export async function render(url, manifest) {
    const { app, router, pinia } = createApp();

    formSSRInstanceProperties(app);

    await router.push(url);
    await router.isReady();

    const ctx = { pinia, router };
    const html = await renderToString(app, ctx);

    // get initial state from app context after data loaded on server side
    const initialState = JSON.stringify(app.config.initialState);

    const preloadLinks = renderPreloadLinks(ctx.modules, manifest);

    return { html, initialState, preloadLinks };
}
