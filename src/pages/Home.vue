<template>
    <p class="par">Hello Page</p>
    <p>RES {{ res }}</p>
</template>

<script setup="ts">
import { ref, onMounted } from "vue";
import { useAsyncData } from "../composables/asyncData";
const res = ref("init");

onMounted(() => {
    console.log("MOUNTED", res.value);
});

const { data } = await useAsyncData("test", () => {
    console.log("FETCH DATA");
    return fetch("https://jsonplaceholder.typicode.com/todos/1")
        .then((response) => response.json())
        .then((json) => {
            console.log("FETCH RECEIVED");
            return json;
        });
});

console.log("data", data.value);
res.value = data;
</script>

<style scoped>
.par {
    color: blueviolet;
}
</style>
