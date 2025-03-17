import { defineStore } from "pinia";
import { ref } from "vue";

export const useCounterStore = defineStore("counterStore", () => {
    const counter = ref(0);

    function increment() {
        counter.value = counter.value + 1;
    }

    async function loadTest() {
        return fetch("https://jsonplaceholder.typicode.com/todos")
            .then((response) => response.json())
            .then((json) => {
                console.log("load test", json.length);
                counter.value = json.length;
            });
    }

    return {
        counter,
        loadTest,
        increment,
    };
});
