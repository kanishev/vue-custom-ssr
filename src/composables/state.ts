import { isRef, Ref, toRef } from "vue";
import { getAppInstance } from "../utils/appInstance.ts";
import { toArray } from "../utils/array";

export function useState<T>(key: string, init?: () => T | Ref<T>): Ref<T> {
    if (!key || typeof key !== "string") {
        throw new TypeError("[useState] key must be a string: " + key);
    }

    if (init !== undefined && typeof init !== "function") {
        throw new Error("[useState] init property must be a function: " + init);
    }

    const instance = getAppInstance();

    if (!instance) {
        throw new Error("[useState] no instance provided");
    }

    const state = toRef(instance.config.globalState, key);

    if (state.value === undefined && init) {
        const initialValue = init();

        if (isRef(initialValue)) {
            instance.config.globalState[key] = initialValue;
            return initialValue as Ref<T>;
        }

        state.value = initialValue;
    }

    return state;
}

export function clearState(keys?: string | string[]): void {
    const instance = getAppInstance();

    const stateKeys = Object.keys(instance.config.globalState);

    const keysToIterate = !keys ? stateKeys : typeof keys === "string" ? toArray(keys) : keys;

    for (let key of keysToIterate) {
        instance.config.globalState[key] = undefined;
    }
}
