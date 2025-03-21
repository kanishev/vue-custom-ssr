import { getCurrentInstance, ref, onServerPrefetch } from "vue";

export const useAsyncData = async (key, handler, options = {}) => {
    const asyncData = {
        data: ref({}),
    };

    asyncData.refresh = () => {
        return new Promise((resolve, reject) => {
            try {
                resolve(handler());
            } catch (error) {
                reject(error);
            }
        })
            .then((result) => {
                asyncData.data.value = result;
            })
            .catch(() => {
                asyncData.data.value = false;
            });
    };

    const initialFetch = () => asyncData.refresh();

    if (import.meta.env.SSR) {
        const promise = initialFetch();
        if (getCurrentInstance()) {
            onServerPrefetch(() => promise);
        } else {
            await promise;
        }
    }

    return initialFetch().then(() => asyncData);
};
