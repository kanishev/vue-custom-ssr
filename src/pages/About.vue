<template>
    <p class="par">About Page</p>
    <Block />
</template>

<script setup lang="ts">
import Block from "../components/Block/Block.vue";
// import { computed, defineComponent } from "vue";
// import { useCounterStore } from "../stores/counterStore";

// export default defineComponent({
//     asyncData: ({ pinia }) => {
//         useCounterStore(pinia).loadTest();
//     },
//     setup() {
//         const counterStore = useCounterStore();
//         const counter = computed(() => counterStore.counter);

//         console.log("counter", counter.value);
//         return {
//             counter,
//         };
//     },
// });
</script>

<style scoped>
.par {
    color: blueviolet;
}
</style>
