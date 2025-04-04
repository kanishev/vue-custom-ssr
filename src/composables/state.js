import { isRef, toRef } from "vue";
import { getAppInstance } from "../utils/appInstance";

export function useState(key, init = undefined) {
    if (!key || typeof key !== "string") {
        throw new TypeError("[useState] key must be a string: " + _key);
    }

    if (init !== undefined && typeof init !== "function") {
        throw new Error("[useState] init property must be a function: " + init);
    }

    const instance = getAppInstance();
    const state = toRef(instance.config.globalState, key);

    if (state.value === undefined && init) {
        const initialValue = init();

        if (isRef(initialValue)) {
            instance.config.globalState[key] = initialValue;
            return initialValueж;
        }

        state.value = initialValue;
    }

    return state;
}
