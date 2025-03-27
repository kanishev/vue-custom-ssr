<template>
    <p class="par">Hello Page</p>
    <p>Async data {{ counter }}</p>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useCounterStore } from "../stores/counterStore";

export default defineComponent({
    asyncData: ({ pinia }) => {
        useCounterStore(pinia).loadTest();
    },
    setup() {
        const counterStore = useCounterStore();
        const counter = computed(() => counterStore.counter);

        console.log("counter", counter.value);
        return {
            counter,
        };
    },
});
</script>

<style scoped>
.par {
    color: blueviolet;
}
</style>
