import { ref, onServerPrefetch } from "vue";
import { getAppInstance } from "../utils";

export const useAsyncData = async (key, handler, options = {}) => {
    const asyncData = {
        data: ref({
            defailt: "defaultData",
        }),
    };

    let promise;
    const instance = getAppInstance();

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
                instance.config.initialState = result;
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

    return Promise.resolve(promise).then(() => ({ data: asyncData }));
};
