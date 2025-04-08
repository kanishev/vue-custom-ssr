import { deserializeState } from "./deserializeState";

export function getContext() {
    const initialState = deserializeState(window.__initialState__);
    const globalState = deserializeState(window.__globalState__);
    const piniaState = deserializeState(window.__piniaState__);

    const context = {
        initialState,
        globalState,
        piniaState,
    };

    return context;
}
