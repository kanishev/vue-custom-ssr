<template>
    <p class="par">Hello Page</p>
    <p>RES {{ res }}</p>

    <p>STATE COUNTER: {{ counter }}</p>
    <Block />
</template>

<script setup lang="ts">
import Block from "../components/Block/Block.vue";
import { ref, onMounted } from "vue";
import { useAsyncData } from "../composables/asyncData.ts";
import { useState } from "../composables/state.ts";
const res = ref("Hello");

onMounted(() => {
    console.log("MOUNTED", res.value);
});

const counter = useState("counter");

const { data } = await useAsyncData("test", () => {
    return fetch("https://jsonplaceholder.typicode.com/todos/1")
        .then((response) => response.json())
        .then((json) => {
            console.log("FETCH RECEIVED");
            return json;
        });
});

res.value = data.value;
</script>

<style scoped>
.par {
    color: blueviolet;
}
</style>
