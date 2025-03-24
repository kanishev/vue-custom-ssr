<template>
    <!-- <router-view v-slot="{ Component }">
        <Suspense>
            <div>
                <component :is="Component" />
            </div>
        </Suspense>
    </router-view> -->

    LIST: {{ res }}

    <template v-if="false">
        <div class="router-links">
            <router-link to="/">Home</router-link>
            <router-link to="/about">About</router-link>
        </div>

        <button class="btn inter" @click="counter++">
            Counter: {{ counter }}
        </button>

        <h2>Store info: {{ counterStore.counter }}</h2>
        <button @click="counterStore.increment">store increment</button>
    </template>

    <Mismatch v-if="false" />
</template>

<script setup>
import { useAsyncData } from "./ssr/composables/asyncData";
import Mismatch from "./components/Mismatch.vue";
import { ref } from "vue";
const res = ref();

const { data } = useAsyncData("test", () => {
    return fetch("https://jsonplaceholder.typicode.com/todos/1")
        .then((response) => response.json())
        .then((json) => {
            console.log("FETCH RECEIVED");
            return json;
        });
});

res.value = data;
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
