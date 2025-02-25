import {
    createRouter,
    createMemoryHistory,
    createWebHistory,
} from "vue-router";
import Home from "./pages/Home.vue";
import About from "./pages/About.vue";

export function createAppRouter() {
    return createRouter({
        history: import.meta.env.SSR
            ? createMemoryHistory()
            : createWebHistory(),
        routes: [
            { path: "/", component: Home },
            { path: "/about", component: About },
        ],
    });
}
