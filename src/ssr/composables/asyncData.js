import { getCurrentInstance, ref, onServerPrefetch } from "vue";

export const useAsyncData = async (key, handler, options = {}) => {
    const asyncData = {
        data: ref({}),
    };

    let prom;
    const instance = getCurrentInstance();

    asyncData.refresh = () => {
        const promise = new Promise((resolve, reject) => {
            try {
                resolve(handler());
            } catch (error) {
                reject(error);
            }
        })
            .then((result) => {
                console.log("res", result);
                asyncData.data.value = result;
            })
            .catch(() => {
                asyncData.data.value = false;
            });

        prom = promise;
        return promise;
    };

    const initialFetch = () => asyncData.refresh();

    if (import.meta.env.SSR) {
        const promise = initialFetch();
        if (instance) {
            onServerPrefetch(() => promise);
        } else {
            await promise;
        }
    } else {
        // TODO: add fetchOnServer handler
        initialFetch();
    }

    return Promise.resolve(prom).then(() => asyncData);
};
