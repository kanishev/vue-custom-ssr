import { ref, toRef } from "vue";
import { getAppInstance } from "../utils/appInstance";

export function useState(key, init = null) {
    const instance = getAppInstance();
    const state = toRef(instance.config.globalState, key);

    if (state.value === undefined && init) {
        const initialValue = init();
        instance.config.globalState[key] = initialValue;
        state.value = initialValue;
    }

    // TODO: check wheather initialValue is ref and unRef it
    // TODO: add init fn guards
    return state;
}
