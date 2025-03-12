import {
    createRouter,
    createMemoryHistory,
    createWebHistory,
} from "vue-router";

export function createAppRouter() {
    return createRouter({
        history: import.meta.env.SSR
            ? createMemoryHistory()
            : createWebHistory(),
        routes: [
            { path: "/", component: import("./pages/Home.vue") },
            { path: "/about", component: import("./pages/About.vue") },
        ],
    });
}
