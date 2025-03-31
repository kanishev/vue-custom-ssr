import { ref, onServerPrefetch } from "vue";
import { getAppInstance } from "../utils/appInstance";

export const useAsyncData = (key, handler, options = { server: true }) => {
    const asyncData = {
        data: ref(null),
    };

    let promise;
    const instance = getAppInstance();
    const initialState = instance.config.initialState;

    if (initialState) {
        asyncData.data.value = initialState;
    }

    asyncData.refresh = () => {
        const p = new Promise((resolve, reject) => {
            try {
                resolve(handler());
            } catch (error) {
                reject(error);
            }
        })
            .then((result) => {
                asyncData.data.value = result;
                instance.config.initialState = asyncData.data.value;
            })
            .catch(() => {
                asyncData.data.value = false;
            });

        promise = p;
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
    }

    // TODO: add chaching
    // TODO: add server=false option

    const asyncDataPromise = Promise.resolve(promise).then(() => asyncData);
    return Object.assign(asyncDataPromise, asyncData);
};
