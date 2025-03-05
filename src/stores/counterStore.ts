import { defineStore } from "pinia";
import { ref } from "vue";

export const useCounterStore = defineStore("counterStore", () => {
    const counter = ref(0);

    function increment() {
        counter.value = counter.value + 1;
    }

    return {
        counter,
        increment,
    };
});
