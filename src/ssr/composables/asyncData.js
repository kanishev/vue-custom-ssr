import { getCurrentInstance, ref } from "vue";

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

    return Promise.resolve(initialFetch()).then(() => asyncData);
};
