import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

export default defineConfig({
    plugins: [vue(), vueJsx()],
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "public/index.html"),
            },
        },
    },
});
