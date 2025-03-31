export function deserializeState(state) {
    try {
        if (typeof state == "string") {
            return JSON.parse(state || "{}");
        }
        return state;
    } catch (error) {
        console.error("Error during state deserialization -", error, state);
        return {};
    }
}
