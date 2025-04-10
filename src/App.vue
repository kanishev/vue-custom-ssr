<template>
    <div class="router-links">
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
    </div>

    <RouterView v-slot="{ Component }">
        <Suspense>
            <component :is="Component" />
        </Suspense>
    </RouterView>

    COUNTER {{ counter }}
</template>

<script setup>
import { useState } from "./composables/state.ts";
const counter = useState("counter", () => 100500);
</script>

<style>
@font-face {
    font-family: "Inter";
    font-style: italic;
    font-weight: 400;
    font-display: swap;
    src: url("./assets/fonts/Inter-Italic.woff2#iefix") format("woff2"),
        url("./assets/fonts/Inter-Italic.woff") format("woff");
}
.inter {
    font-family: "Inter";
}

.router-links {
    display: flex;
    gap: 10px;
    margin: 10px 0;
}
</style>
