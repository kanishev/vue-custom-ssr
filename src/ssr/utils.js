export function getMatchedComponents(matched) {
    return matched.map((m) => Object.values(m.components)).flat();
}

export const callAsyncData = async (components, context) => {
    const asyncFns = components
        .map((c) => {
            return c.asyncData;
        })
        .filter(Boolean);

    if (asyncFns.length !== 0) {
        await Promise.all(asyncFns.map((a) => a(context)));
    }
};
