import { ref, Ref, onServerPrefetch } from "vue";
import { getAppInstance } from "../utils/appInstance";

interface AsyncDataOptions {
    server?: boolean;
}

interface IAsyncData<DataT> {
    data: Ref<DataT>;
    refresh: () => Promise<void>;
}

type AsyncData<T> = IAsyncData<T> & Promise<IAsyncData<T>>;

export function useAsyncData<T>(
    key: string,
    handler: () => Promise<T>,
    options: AsyncDataOptions = { server: true }
): AsyncData<T> {
    const asyncData = { data: ref(null) } as AsyncData<T>;

    let promise;
    const instance = getAppInstance();
    const initialState = instance.config.initialState;

    const isServer = import.meta.env.SSR;

    if (key in initialState) {
        asyncData.data.value = initialState[key];
    }

    asyncData.refresh = () => {
        const p = new Promise<T>((resolve, reject) => {
            try {
                resolve(handler());
            } catch (error) {
                reject(error);
            }
        })
            .then((result) => {
                asyncData.data.value = result;
                instance.config.initialState[key] = asyncData.data.value;
            })
            .catch((error) => {
                asyncData.data.value = error?.message;
            });

        promise = p;
        return promise;
    };

    const initialFetch = () => asyncData.refresh();

    const fetchOnServer = options.server !== false;

    if (isServer && fetchOnServer) {
        const promise = initialFetch();
        if (instance) {
            onServerPrefetch(() => promise);
        }
    }

    if (!isServer && !fetchOnServer) {
        initialFetch();
    }

    const asyncDataPromise = Promise.resolve(promise).then(() => asyncData);

    return Object.assign(asyncDataPromise, asyncData);
}
