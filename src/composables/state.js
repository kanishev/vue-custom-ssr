import { isRef, toRef } from "vue";
import { getAppInstance } from "../utils/appInstance";

export function useState(key, init = null) {
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

    // TODO: add init fn guards
    return state;
}
