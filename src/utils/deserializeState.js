export function deserializeState(state) {
    try {
        return JSON.parse(state || "{}");
    } catch (error) {
        console.error("Error during state deserialization -", error, state);
        return {};
    }
}
