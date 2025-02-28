<template>
    <router-view v-slot="{ Component }">
        <Suspense>
            <div>
                <component :is="Component" />
            </div>
        </Suspense>
    </router-view>

    <div class="router-links">
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
    </div>

    <button class="btn inter" @click="counter++">Counter: {{ counter }}</button>
</template>

<script setup>
import { ref } from "vue";

const counter = ref(0);
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
