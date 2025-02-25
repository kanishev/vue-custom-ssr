<template>
    <router-view></router-view>

    <div class="router-links">
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
    </div>

    <button class="btn" @click="counter++">Counter: {{ counter }}</button>
</template>

<script setup>
import { ref } from "vue";

const counter = ref(0);
</script>

<style scoped>
.btn {
    border: none;
    background: lime;
    color: black;
    border-radius: 5px;
    padding: 10px;
}

.router-links {
    display: flex;
    gap: 10px;
    margin: 10px 0;
}
</style>
