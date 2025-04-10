<template>
    <div style="display: flex; gap: 10px">
        <h2>Block counter: {{ store.counter }}</h2>
        <button @click="store.increment">increment</button>
    </div>
</template>

<script setup>
import { useCounterStore } from "../../stores/counterStore";

const store = useCounterStore();
</script>
