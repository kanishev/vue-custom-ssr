export function deserializeState<T extends Record<string, unknown>>(state: string | T): T {
    try {
        if (typeof state === "string") {
            return JSON.parse(state || "{}") as T;
        }
        return state;
    } catch (error) {
        console.error("Error during state deserialization -", error, state);
        return {} as T;
    }
}
