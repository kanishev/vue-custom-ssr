import { deserializeState } from "./deserializeState";

export function getContext() {
    const initialState = deserializeState(window.__initialState__);

    const context = {
        initialState,
    };

    return context;
}
