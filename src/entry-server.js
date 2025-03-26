import { renderToString } from "vue/server-renderer";
import { createApp } from "./main.js";
import {
    getMatchedComponents,
    callAsyncData,
    renderPreloadLinks,
} from "./ssr/utils.js";

export async function render(url, manifest) {
    const { app, router, pinia } = createApp();

    await router.push(url);
    await router.isReady();

    const context = {
        pinia,
        router,
    };

    const components = getMatchedComponents(router.currentRoute.value.matched);
    await callAsyncData(components, context);

    const ctx = {};
    const html = await renderToString(app, ctx);

    // get initial state from app context after data loaded on server side
    const initialState = JSON.stringify(app.config.initialState);

    const preloadLinks = renderPreloadLinks(ctx.modules, manifest);

    return { html, initialState, preloadLinks };
}
