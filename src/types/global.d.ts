declare global {
    interface Window {
        __initialState__: Record<string, unknown>;
        __globalState__: Record<string, unknown>;
        __piniaState__: Record<string, unknown>;
    }
}

export {};
